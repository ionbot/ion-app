import { io } from "socket.io-client";
import { HOST } from "../../../config";

const socket = io(HOST, {
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("ion-token"),
  },
});
export default socket;
