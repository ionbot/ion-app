import {
  Box,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { UserBotStore } from "../../../../store/userbot.store";
import socket from "../../providers/socket.io";

export default () => {
  const userbot = UserBotStore.useState((s) => s);

  //todo: separate this component
  const StatusCard = ({ title, subTitle, action }) => (
    <Box p={4} borderWidth="1px" rounded="lg" bg="white">
      <Heading size="lg">{subTitle}</Heading>
      <Text fontSize="sm" color="gray.500" mt={2}>
        {title}
      </Text>
      <Box mt={3}>{action}</Box>
    </Box>
  );
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        <GridItem>
          <StatusCard
            title={"Userbot Status"}
            subTitle={userbot.status == 1 ? "Running" : "Stopped"}
            action={
              <Button
                display={!userbot.isAuth && "none"}
                colorScheme={userbot.status == 0 ? "brand" : "red"}
                size="sm"
                onClick={() => {
                  socket.emit(`${userbot.status == 0 ? "start" : "stop"}-bot`);
                }}
              >
                {userbot.status == 0 ? "Start" : "Stop"} Userbot
              </Button>
            }
          />
        </GridItem>

        <GridItem>
          <StatusCard title="Up since" subTitle={userbot.upTime} />
        </GridItem>

        <GridItem>
          <StatusCard title="Errors Occurred" subTitle="0" />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
