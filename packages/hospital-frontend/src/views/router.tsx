import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UnauthenticatedApp } from "./login";
import Index from "./index";
import { Profile } from "./profile";

const Root: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={UnauthenticatedApp} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Root;
