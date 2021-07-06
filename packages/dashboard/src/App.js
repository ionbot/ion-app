import { Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import useFetch from "use-http";

import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import { UserStore } from "./store/user.store";

const App = (props) => {
  /** Fetch user, if not found, render Setup view */

  const userApi = useFetch("/user");
  useEffect(() => {
    userApi.get().then((profile) => {
      if (profile)
        UserStore.update((s) => {
          s.profile = profile;
          s.ionv = profile.version;
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

  if (userApi.data && !userApi.data.id) {
    return <Setup />;
  }

  return <Dashboard {...props} />;
};

export default App;
