/** Db Configuration Provider */

import { Config } from "../models/config";

export const get = async (module: string) => {
  try {
    return await Config.findOne({ module });
  } catch (error) {
    console.log("error", error);
  }
};
export const set = async (module: string, values: object) => {
  try {
    await Config.create({
      module,
      values,
    });
  } catch (e) {
    if (String(e).includes("E11000")) {
      await Config.findOneAndUpdate({ module }, { values });
    }
  }
};
