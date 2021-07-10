import io from "../socket";
import ModuleLoader from "./ModuleLoader";

export default new (class extends ModuleLoader {
  constructor() {
    super();

    io.on("connection", (socket) => {
      socket.on("start-bot", () => this.start(socket));
      socket.on("stop-bot", () => this.stop(socket));
      socket.on("update-config", this.configUpdater);
    });
  }
})();
