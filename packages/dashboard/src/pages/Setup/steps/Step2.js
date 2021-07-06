import { Stack, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { SetupStore } from "../../../store/setup.store";

export default () => {
  const handelChange = (e) => {
    SetupStore.update((s) => {
      s.data[e.target.id] = e.target.value;
    });
  };

  return (
    <Stack>
      <FormControl>
        <FormLabel>Phone Code</FormLabel>
        <Input placeholder="956475" id="phoneCode" onChange={handelChange} />
      </FormControl>
    </Stack>
  );
};
