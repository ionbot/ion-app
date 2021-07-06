import { Ion } from "../ion/core";
import * as session_config from "../ion/session";
import VERSION from "../version";

const ion = new Ion();

export const getUser = async () => {
  return {
    ...ion.user,
    version: VERSION,
  };
};
