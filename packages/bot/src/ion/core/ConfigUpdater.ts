import * as moduleConfig from "../providers/module-config";

export default class {
  config: object = {};

  moduleConfigUpdater(data: any) {
    const { module, values } = data;
    moduleConfig.set(module, values);
  }
}
