import { Stack, Input, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { SetupStore } from "../../../store/setup.store";

export default () => {
  const {passwordHint} = SetupStore.useState(s => s);

  const handelChange = (e) => {
    SetupStore.update((s) => {
      s.data[e.target.id] = e.target.value;
    });
  };

  return (
    <Stack>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input placeholder={passwordHint} id="password"  onChange={handelChange} />
        <FormHelperText>Enter Your Telegram 2FA Password</FormHelperText>
      </FormControl>
    </Stack>
  );
};
