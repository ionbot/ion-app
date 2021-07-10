import { NodeVM } from "vm2";

import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";

const meta: ModuleMeta = require("./meta.json");

const vm = new NodeVM({
  require: {
    external: true,
  },
});

const EvalModule = async (event: NewMessageEvent, config?: any) => {
  let match = event.message.text.match(/^.eval ([\s\S]+)/m);
  let code = "";

  if (match) {
    code = match[1];
  }

  console.log("code", vm.run(code));
  let text = "";

  // event.message.reply(code)
  // await event.message.edit({
  //   text,
  //   parseMode: "markdown",
  // });
};

export default {
  handler: EvalModule,
  meta,
};
