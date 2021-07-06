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
        <Input placeholder="158435" id="apiId" onChange={handelChange} />
      </FormControl>

      <FormControl>
        <FormLabel>API Hash</FormLabel>
        <Input
          placeholder="2f5fb10964323b4bcc"
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
