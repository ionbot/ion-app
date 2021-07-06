import { Store } from "pullstate";

export const SetupStore = new Store({
  step: 1,
  loading: false,
  passwordHint: '',
  data: {
    apiId: 0,
    apiHash: "",
    phoneNumber: "",
    phoneCode: "",
  },
  final: {},
});
