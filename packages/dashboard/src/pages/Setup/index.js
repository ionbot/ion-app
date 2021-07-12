import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Spinner,
  Image,
  Button,
  Flex,
  Heading,
  Tag,
  Spacer,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  chakra,
} from "@chakra-ui/react";

import { SetupStore } from "../../store/setup.store";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

import socket from "../Dashboard/providers/socket.io";

const MAX_STEP = 4;

const StepView = {
  1: <Step1 />, // user credentials
  2: <Step2 />, // user authentication
  3: <Step3 />, // password
  4: <Step4 />, // success
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setupStore = SetupStore.useState((s) => s);

  const SetStep = (n) => {
    SetupStore.update((s) => {
      s.step = n;
    });
  };

  useEffect(() => {
    socket.on("get-phone-code", () => {
      setLoading(false);
      SetStep(2);
    });

    socket.on("get-password", (hint) => {
      if (hint) {
        SetupStore.update((s) => {
          s.passwordHint = hint;
        });
      }
      setLoading(false);
      SetStep(3);
    });

    socket.on("error", (error) => {
      setError(error);
      setLoading(false);
    });

    socket.on("user-welcome", (data) => {
      setLoading(false);
      SetupStore.update((s) => {
        s.final = data;
      });
      SetStep(4);
    });
  }, []);

  const handleNext = () => {
    const { step } = setupStore;
    switch (step) {
      case 1:
        setLoading(true);
        socket.emit("user-data", setupStore.data);
        break;
      case 2:
        setLoading(true);
        socket.emit("phone-code", setupStore.data.phoneCode);
      case 3:
        setLoading(true);
        socket.emit("password", setupStore.data.password);
      case 4:
        localStorage.setItem("ion-token", setupStore.data.apiHash); // user API Hash as token
        break;
    }
  };

  const NavButtons = () => {
    let buttons = [];
    const { step } = setupStore;

    if (step < MAX_STEP) {
      buttons.push(
        <Button colorScheme="brand" onClick={handleNext}>
          Next
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box pos="relative">
      <Center mt={{ base: 8, md: 16 }}>
        <Image src="/assets/ion-logo.png" w={24} />
      </Center>

      <Center mt={6} p={4}>
        <Box w={{ base: "full", md: "2xl" }} pos="relative">
          {setupStore.step < 4 ? (
            <>
              <Flex alignItems="center" p={4} rounded="lg" bg="gray.100">
                <Heading>🚀 Ion Setup</Heading>
                <Spacer />
                <Tag size="lg" colorScheme="brand">
                  Step {setupStore.step} of {MAX_STEP}
                </Tag>
              </Flex>

              <Text p={4}>
                Thanks for choosing Ion. Please fill out the required
                information to activate your userbot. Get this value from{" "}
                <chakra.a
                  href="https://my.telegram.org"
                  target="_blank"
                  color="blue"
                >
                  here
                </chakra.a>
                .
              </Text>
            </>
          ) : null}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Box p={4} bg="white">
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              StepView[setupStore.step]
            )}
          </Box>
          <Center pos="absolute" right={4}>
            <HStack>{!loading && <NavButtons />}</HStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};
