import { NodeVM, VMScript } from "vm2";
import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
    const vm = new NodeVM({
      console: "inherit",
      sandbox: { event },
      require: {
        external: true,
        builtin: ["fs", "path", "process", "os"],
      },
    });

    let match = event.message.text.match(/^.eval ([\s\S]+)/m);
    let code = "";

    if (match) {
      code = match[1];
    }

    // const before = Date.now();

    let output = "";

    try {
      const script = new VMScript(`module.exports = ${code}`);
      output = vm.run(script);
      // const diff = Date.now() - before;
    } catch (e) {
      output = e;
    }

    event.message.edit({
      text: `<code>${output}</code>`,
      parseMode: "html",
    });
  },
  { match: "eval" }
);
