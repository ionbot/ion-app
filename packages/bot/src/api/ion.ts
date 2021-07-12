import { formatDistance } from "date-fns";

import Ion from "../ion/core";
import VERSION from "../version";

export const getUserBot = async (token: string) => {
  const status = Ion.status;
  const isAuth = Ion.isValidToken(token);

  if (token.length > 0) {
    if (!isAuth) {
      return { isAuth: false, status: Ion.status };
    }
  }

  if (token.length === 0) {
    return {};
  }

  return {
    isAuth,
    profile: Ion.user,
    status,
    upTime: formatDistance(Ion.startTime, new Date(), {
      addSuffix: true,
    }),
    version: VERSION,
  };
};

export const getLoadedModules = async () => {
  return Ion.loadedModules;
};
