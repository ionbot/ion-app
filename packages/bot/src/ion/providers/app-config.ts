import { Configs } from "../../models/configs";

export const save = async (key: string, value: any) => {
  try {
    await Configs.create({ key, value });
  } catch (e) {
    await Configs.updateOne({ key }, { value });
  }

  return;
};
export const load = async (key: string): Promise<any> => {
  return await Configs.findOne({ key });
};
