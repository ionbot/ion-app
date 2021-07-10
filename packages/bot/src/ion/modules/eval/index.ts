import { NodeVM, VMScript } from "vm2";

import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";

const meta: ModuleMeta = require("./meta.json");

const EvalModule = async (event: NewMessageEvent, config?: any) => {
  const vm = new NodeVM({
    console: "inherit",
    sandbox: { event },
    require: {
      external: true,
      builtin: ["fs", "path", "process"],
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
};

export default {
  handler: EvalModule,
  meta,
};
