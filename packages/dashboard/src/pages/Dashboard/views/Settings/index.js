import { Stack } from "@chakra-ui/react";
import { UserBotStore } from "../../../../store/userbot.store";
import IonCard from "../../components/IonCard";

export default () => {
  // const userbot = UserBotStore.useState((s) => s);

  return (
    <Stack spacing={6}>
      <IonCard
        title="Settings"
        subTitle="Customize your user bot as you want"
      ></IonCard>
    </Stack>
  );
};
