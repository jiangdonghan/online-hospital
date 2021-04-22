import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UnauthenticatedApp } from "./login";
import Index from "./index";

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/login" exact component={UnauthenticatedApp} />
    </Switch>
  </BrowserRouter>
);

export default Root;
