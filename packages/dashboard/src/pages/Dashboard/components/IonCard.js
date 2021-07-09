import { Box, Heading, Text } from "@chakra-ui/react";

export default ({ title, subTitle, danger, children }) => {
  return (
    <Box>
      <Box p={4} bg={"gray.100"} roundedTop="lg">
        <Heading size="md">{title}</Heading>
        <Text mt={1} fontSize="sm">
          {subTitle}
        </Text>
      </Box>

      <Box p={4} bg="white" roundedBottom="lg">
        {children}
      </Box>
    </Box>
  );
};
