import { Box, Button, Center, Spinner, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useFetch from "use-http";

import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import { UserBotStore } from "./store/userbot.store";

const App = (props) => {
  /** Fetch user, if not found, render Setup view */
  const { isAuth, status } = UserBotStore.useState((s) => s);
  const userApi = useFetch(
    "/userbot?token=" + (localStorage.getItem("ion-token") || "")
  );

  useEffect(() => {
    userApi.get().then((data) => {
      if (data) {
        const { profile, version, upTime, status, isAuth } = data;
        if (!isAuth) {
          UserBotStore.update((s) => {
            s.isAuth = false;
            s.status = status;
          });
        } else if (profile)
          UserBotStore.update((s) => {
            s.profile = data.profile;
            s.ionv = version;
            s.status = status;
            s.upTime = upTime;
          });
      }
    });
  }, []);

  if (userApi.loading) {
    return (
      <Center mt={12}>
        <Spinner />
      </Center>
    );
  }

  if (status == 1 && !isAuth)
    return (
      <Box m={{ base: 3, md: 8, lg: 14 }} p={4} borderWidth="1px" rounded="md">
        <Heading textColor="red.400">401: Unauthorized</Heading>
        <Text mt={3} w={{ base: "full" }}>
          Sorry, you don't have access to view this page. If you think this is a
          mistake, click the button below.
        </Text>
        <Button
          mt={4}
          size="sm"
          onClick={() => {
            localStorage.clear("ion-token");
            window.location = "/";
          }}
        >
          Login
        </Button>
      </Box>
    );

  if (userApi.data && userApi.data.profile) {
    return <Dashboard {...props} />;
  }
  return <Setup />;
};

export default App;
