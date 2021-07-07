import Ion from "../ion/core";
import VERSION from "../version";

export const getUser = async () => {
  const status = Ion.botStatus;

  return {
    ...Ion.user,
    status,
    version: VERSION,
  };
};
