import { Store } from "pullstate";
import socket from "../pages/Dashboard/providers/socket.io";

const UserBotStore = new Store({
  ionv: "0.0.0",
  profile: {},
  upTime: 0,
  status: 0,
  isAuth: true,
});

socket.on("bot-status", (status) => {
  UserBotStore.update((s) => {
    s.status = status;
  });
});

socket.on("logout", () => {
  window.location = "/";
});

export { UserBotStore };
