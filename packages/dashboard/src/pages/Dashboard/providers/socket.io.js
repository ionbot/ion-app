import { io } from "socket.io-client";
let { REACT_APP_HOST: HOST } = process.env;

const socket = io(HOST, { transports: ["websocket"] });
export default socket;
