import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { SetupStore } from "../../../store/setup.store";

export default () => {
  const handelChange = (e) => {
    SetupStore.update((s) => {
      s.data[e.target.id] = e.target.value;
    });
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>API ID</FormLabel>
        <Input placeholder="3499832" id="apiId" onChange={handelChange} />
      </FormControl>

      <FormControl>
        <FormLabel>API Hash</FormLabel>
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
        <FormHelperText>Enter phone number with country code</FormHelperText>
      </FormControl>
    </Stack>
  );
};
