import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import App from "./App";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:view?" exact component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
