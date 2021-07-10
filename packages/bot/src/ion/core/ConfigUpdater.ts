import * as moduleConfig from "../providers/module-config";

export default class ConfigUpdater {
  config: object = {};

  configUpdater(data: any) {
    const { module, values } = data;
    moduleConfig.set(module, values);
  }
}
