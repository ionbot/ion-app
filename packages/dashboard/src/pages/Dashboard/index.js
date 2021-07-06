import Layout from "./Layout";
import { Redirect } from "react-router-dom";

// Views
import Home from "./views/Home";
import Commands from "./views/Commands";

const Dashboard = ({ match }) => {
  let { view } = match.params;

  const View = () => {
    switch (view) {
      case "home":
        return <Home />;
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
