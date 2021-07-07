import { useEffect } from "react";
import Layout from "./Layout";
import { Redirect } from "react-router-dom";

import socket from "./providers/socket.io";
// Views
import Home from "./views/Home";
import Commands from "./views/Commands";
import Modules from "./views/Modules";

const Dashboard = ({ match }) => {
  let { view } = match.params;

  // Handle modules event
  useEffect(() => {
    socket.on("module-loaded", (data) => {
      console.log("data", data);
    });
  }, []);

  const View = () => {
    switch (view) {
      case "home":
        return <Home />;
      case "modules":
        return <Modules />;
      case "commands":
        return <Commands />;
      default:
        return <Redirect to="/home" />;
    }
  };

  return (
    <Layout>
      <View />
    </Layout>
  );
};

export default Dashboard;
