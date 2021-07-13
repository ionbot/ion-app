import { Box, Button, Heading } from "@chakra-ui/react";

export default () => {
  return (
    <Box p={4} borderWidth="1px" rounded="md" bg="white">
      <Heading size="md">Status</Heading>
      <Box mt={4}>
        <Button size="sm">Turn on</Button>
      </Box>
    </Box>
  );
};
