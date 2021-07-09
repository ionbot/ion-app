import io from "../socket";
import ModuleLoader from "./ModuleLoader";

export default new (class Ion extends ModuleLoader {
  constructor() {
    super();

    io.on("connection", (socket) => {
      socket.on("start-bot", async () => {
        await this.start(socket);

        if (this.status == 1) {
          this.loadModules();
        }
      });
      socket.on("stop-bot", () => this.stop(socket));
      socket.on("update-config", this.configUpdater);
    });
  }
})();
