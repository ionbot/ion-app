import { Store } from "pullstate";

export const SetupStore = new Store({
  step: 1,
  loading: false,
  data: {
    apiId: 0,
    apiHash: "",
    phoneNumber: "",
    phoneCode: "",
  },
  final: {},
});
