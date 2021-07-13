import {
  Box,
  Button,
  Center,
  Spinner,
  Heading,
  Text,
  Input,
  Image,
} from "@chakra-ui/react";

import { useEffect, useRef } from "react";
import useFetch from "use-http";

import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import { UserBotStore } from "./store/userbot.store";

const App = (props) => {
  let tokenInput = useRef();

  /** Fetch user, if not found, render Setup view */
  const { isAuth, status } = UserBotStore.useState((s) => s);
  const rootApi = useFetch("");

  const verifyUser = (token, reload) => {
    rootApi.get(`/userbot?token=${token}`).then((data) => {
      if (data) {
        const { profile, version, upTime, status, isAuth } = data;
        if (!isAuth) {
          UserBotStore.update((s) => {
            s.isAuth = false;
            s.status = status;
          });
        } else if (profile) {
          localStorage.setItem("ion-token", token);
          if (reload) {
            window.location = "/";
          } else
            UserBotStore.update((s) => {
              s.profile = data.profile;
              s.ionv = version;
              s.status = status;
              s.upTime = upTime;
            });
        }
      }
    });
  };

  useEffect(() => {
    const localToken = localStorage.getItem("ion-token") || "";
    verifyUser(localToken);
  }, []);

  if (rootApi.loading) {
    return (
      <Center mt={12}>
        <Spinner />
      </Center>
    );
  }

  if (status == 1 && !isAuth)
    return (
      <Box m={{ base: 3, md: 8, lg: 14 }} p={4} borderWidth="1px" rounded="md">
        <Image src="/assets/401.png" w={24} />
        <Heading textColor="red.400">Unauthorized</Heading>
        <Text mt={3} w={{ base: "full" }}>
          Looks like you're trying to access someone else's property. Confirm
          your identity before proceeding.
        </Text>
        <Input ref={tokenInput} mt={4} placeholder="Enter your token" />
        <Button
          mt={4}
          size="sm"
          onClick={() => {
            verifyUser(tokenInput.current.value, true);
          }}
        >
          Login
        </Button>
      </Box>
    );

  if (isAuth && status) {
    return <Dashboard {...props} />;
  }
  return <Setup />;
};

export default App;
