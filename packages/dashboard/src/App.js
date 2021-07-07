import { Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import useFetch from "use-http";

import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import { UserBotStore } from "./store/userbot.store";

const App = (props) => {
  /** Fetch user, if not found, render Setup view */

  const userApi = useFetch("/userbot");
  useEffect(() => {
    userApi.get().then((data) => {
      const { profile, version, upTime, status } = data;
      if (profile)
        UserBotStore.update((s) => {
          s.profile = data.profile;
          s.ionv = version;
          s.status = status;
          s.upTime = upTime;
        });
    });
  }, []);

  if (userApi.loading) {
    return (
      <Center mt={12}>
        <Spinner />
      </Center>
    );
  }

  if (userApi.data && userApi.data.profile) {
    return <Dashboard {...props} />;
  }
  return <Setup />;
};

export default App;
