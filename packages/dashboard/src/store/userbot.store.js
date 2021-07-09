import { Store } from "pullstate";
import socket from "../pages/Dashboard/providers/socket.io";

const UserBotStore = new Store({
  ionv: "0.0.0",
  profile: {},
  upTime: 0,
  status: 0,
});

socket.on("bot-status", (status) => {
  if (status == 1) {
    socket.emit("load-modules");
  }

  UserBotStore.update((s) => {
    s.status = status;
  });
});

export { UserBotStore };
