import io from "../socket";
import ModuleLoader from "./ModuleLoader";

export default new (class Ion extends ModuleLoader {
  constructor() {
    super();

    io.on("connection", (socket) => {
      socket.on("start-bot", () => this.start(socket));
      socket.on("stop-bot", () => this.stop(socket));
      socket.on("update-config", this.configUpdater);
      socket.on("load-modules", this.loadModules);
    });
  }
})();
