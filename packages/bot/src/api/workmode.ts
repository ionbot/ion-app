import { IWorkMode, WorkMode } from "../models/workmode";

export const createWorkMode = async (data: IWorkMode) => {
  await WorkMode.create({ ...data });
  return;
};
