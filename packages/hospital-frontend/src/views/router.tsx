import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserList from "./index";

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={UserList} />
    </Switch>
  </BrowserRouter>
);

export default Root;
