import { Ion } from "../ion/core";
import VERSION from "../version";

const ion = new Ion();

export const getUser = async () => {
  const status = ion.botStatus;

  return {
    ...ion.user,
    status,
    version: VERSION,
  };
};
