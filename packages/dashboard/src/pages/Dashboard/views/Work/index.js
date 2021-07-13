import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import Modes from "./components/Modes";
import ModeStatus from "./components/ModeStatus";

export default () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} spacing={2}>
        <GridItem>
          <ModeStatus />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Modes />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
