import getId from "./getId";
import help from "./help";
import meta from "./meta";
import purge from "./purge";
import source from "./source";
import time from "./time";

export default {
  handlers: [...getId, help, purge, source, time],
  meta,
};
