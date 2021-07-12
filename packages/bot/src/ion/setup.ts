import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import Ion from "./core";
import * as sessionProvider from "./providers/session";
import io from "./socket";

io.on("connection", (socket) => {
  const GetPhoneCode = () =>
    new Promise((resolve) => {
      socket.emit("get-phone-code");
      socket.on("phone-code", (code) => {
        resolve(code);
      });
    });

  const GetPassword = (hint?: string) =>
    new Promise((resolve) => {
      socket.emit("get-password", hint);
      socket.on("password", (code) => {
        resolve(code);
      });
    });

  socket.on("user-data", async (data) => {
    try {
      const { apiId, apiHash, phoneNumber } = data;
      const stringSession = new StringSession("");

      const client = new TelegramClient(stringSession, Number(apiId), apiHash, {
        connectionRetries: 5,
      });

      await client.start({
        phoneNumber: async () => phoneNumber,
        password: async (hint?: string) => {
          const password = await GetPassword(hint);
          return String(password);
        },
        phoneCode: async () => {
          const code = await GetPhoneCode();
          return String(code);
        },
        onError: (err) => {
          socket.emit("error", String(err));
        },
      });

      const self: any = await client.getMe();

      const usersession = String(client.session.save());

      await sessionProvider.save({
        userId: Number(self.id),
        apiId,
        apiHash,
        session: usersession,
      });

      Ion.start();

      socket.emit("user-welcome", (self as Api.User).firstName);
    } catch (error) {
      socket.emit("error", String(error));
    }
  });
});
