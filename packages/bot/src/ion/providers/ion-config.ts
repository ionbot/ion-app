/** Db Configuration Provider */

import { IonConfig } from "../../models/ionconfigs";

export const get = async (key: string) => {
  try {
    const item = await IonConfig.findOne({ key });
    if (item) return item.value;

    return null;
  } catch (error) {
    return null;
  }
};

export const set = async (key: string, value: string) => {
  try {
    await IonConfig.create({
      key,
      value,
    });
  } catch (e) {
    if (String(e).includes("E11000")) {
      await IonConfig.findOneAndUpdate({ key }, { value });
    }
  }
};
