import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import * as session from "./session";
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

      const client = new TelegramClient(stringSession, apiId, apiHash, {
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

      const self = await client.getMe();

      const usersession = String(client.session.save());

      session.save({
        apiId,
        apiHash,
        session: usersession,
      });

      socket.emit("user-welcome", {
        user: self,
      });
    } catch (error) {
      socket.emit("error", String(error));
    }
  });
});

io.listen(8000);
