/** Db Configuration Provider */

import { ModuleConfigs } from "../../models/moduleconfig";

export const get = async (module: string) => {
  try {
    return await ModuleConfigs.findOne({ module });
  } catch (error) {
    console.log("error", error);
  }
};

export const set = async (module: string, values: object) => {
  try {
    await ModuleConfigs.create({
      module,
      values,
    });
  } catch (e) {
    if (String(e).includes("E11000")) {
      await ModuleConfigs.findOneAndUpdate({ module }, { values });
    }
  }
};
