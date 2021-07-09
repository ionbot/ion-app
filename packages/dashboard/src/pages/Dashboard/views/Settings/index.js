import { Stack, Button } from "@chakra-ui/react";
import { UserBotStore } from "../../../../store/userbot.store";
import IonCard from "../../components/IonCard";
import socket from "../../providers/socket.io";

export default () => {
  const userbot = UserBotStore.useState((s) => s);

  return (
    <Stack spacing={6}>
      <IonCard title="Settings" subTitle="Customize your user bot as you want">
        <Button
          colorScheme={userbot.status == 0 ? "brand" : "red"}
          size="sm"
          onClick={() => {
            socket.emit(`${userbot.status == 0 ? "start" : "stop"}-bot`);
          }}
        >
          {userbot.status == 0 ? "Start" : "Stop"} Userbot
        </Button>
      </IonCard>
    </Stack>
  );
};
