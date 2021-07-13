import io from "../socket";
import ModuleLoader from "./ModuleLoader";

export default new (class extends ModuleLoader {
  constructor() {
    super();

    io.use((socket: any, next: Function) => {
      if (this.user) {
        const token = socket.handshake.auth.token;
        if (this.isValidToken(token)) next();
      } else {
        next();
      }
    });

    io.on("connection", (socket) => {
      socket.on("start-bot", () => this.start(socket));
      socket.on("stop-bot", () => this.stop(socket));
      socket.on("logout", () => {
        this.logout(socket);
      });
      socket.on("update-mod-config", (data) => {
        let final = this.loadedModules.map((module) => {
          if (module.meta.slug == data.module) module.config = data.values;
          return module;
        });
        this.loadedModules = final;
        this.moduleConfigUpdater(data);
      });
    });
  }
})();
