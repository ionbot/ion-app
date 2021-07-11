import { io } from "socket.io-client";
import { HOST } from "../../../config";

const socket = io(HOST, { transports: ["websocket"] });
export default socket;
