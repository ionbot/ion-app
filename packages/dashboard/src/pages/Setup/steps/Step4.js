import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { SetupStore } from "../../../store/setup.store";

export default () => {
  const user = SetupStore.useState((s) => s.final);
  if (!user) return null;

  return (
    <Box pos="relative">
      <Alert
        colorScheme="brand"
        variant="top-accent"
        flexDirection="column"
        textAlign="center"
        rounded="lg"
        p={4}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Welcome, {user}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          You've successfully setup your user bot, test it by sending (
          <code>.ping</code> ) to any chat.
        </AlertDescription>
      </Alert>
      <HStack pos="absolute" right={0} mt={4}>
        <Button
          leftIcon={<FaTelegram />}
          colorScheme="brand"
          variant="outline"
          href="https://t.me/ionuserbotchat"
          target="_blank"
          as="a"
        >
          Join Telegram
        </Button>
        <Button leftIcon={<FiArrowRight />} colorScheme="brand" href="/" as="a">
          Awesome Dashboard
        </Button>
      </HStack>
    </Box>
  );
};
