import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";

const Pages = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Pages;
