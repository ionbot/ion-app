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
        <FormLabel>API ID</FormLabel>
        <Input placeholder="Get this value from https://my.telegram.org" id="apiId" onChange={handelChange} />
      </FormControl>

      <FormControl>
        <FormLabel>API Hash</FormLabel>
        <Input
          placeholder="Get this value from https://my.telegram.org"
          id="apiHash"
          onChange={handelChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="+91XXXXXXXXXX"
          id="phoneNumber"
          onChange={handelChange}
        />
      </FormControl>
    </Stack>
  );
};
