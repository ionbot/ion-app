import { IWorkMode, WorkMode } from "../models/workmode";

export const createWorkMode = async (data: IWorkMode) => {
  console.log("data", data);
  await WorkMode.create({ ...data });
  return;
};

export const getWorkMode = async () => {
  const workModes = await WorkMode.find({});
  return workModes;
};

export const delWorkMode = async (id: string) => {
  const workModes = await WorkMode.remove({ _id: id });
  return workModes;
};
