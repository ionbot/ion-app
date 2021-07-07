import { Box, GridItem, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { UserBotStore } from "../../../../store/userbot.store";

export default () => {
  const userbot = UserBotStore.useState((s) => s);

  const StatusCard = ({ title, subTitle }) => (
    <Box p={4} borderWidth="1px" rounded="lg" bg="white">
      <Heading size="lg">{subTitle}</Heading>
      <Text fontSize="sm" color="gray.500" mt={2}>
        {title}
      </Text>
    </Box>
  );
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        <GridItem>
          <StatusCard
            title={"Userbot Status"}
            subTitle={userbot.status == 1 ? "Running" : "Stopped"}
          />
        </GridItem>

        <GridItem>
          <StatusCard title="Up since" subTitle={userbot.upTime} />
        </GridItem>

        <GridItem>
          <StatusCard title="Errors Occurred" subTitle="2" />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
