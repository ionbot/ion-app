import { Box, GridItem, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export default () => {
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
          <StatusCard title={"Userbot Status"} subTitle={"Running"} />
        </GridItem>

        <GridItem>
          <StatusCard title="Up since" subTitle="4 min 34 sec" />
        </GridItem>

        <GridItem>
          <StatusCard title="Errors Occurred" subTitle="2" />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
