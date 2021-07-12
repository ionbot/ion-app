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
        <FormLabel>API ID (Get This Value From  "https://my.telegram.org")</FormLabel>
        <Input placeholder="3499832" id="apiId" onChange={handelChange} />
      </FormControl>

      <FormControl>
        <FormLabel>API HASH (Get This Value From  "https://my.telegram.org")</FormLabel>
        <Input
          placeholder="a2sd889qw88dq9du9dq8w7ud9o"
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
