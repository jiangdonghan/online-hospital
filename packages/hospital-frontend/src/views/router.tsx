import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UnauthenticatedApp } from "./login";
import Index from "./index";
import { ProfilePage } from "./profile";
import { DoctorSearchPage } from "./doctor-search/doctor-search-page";
import { AppointmentPage } from "./appointment/appointment-page";
import { VideoChatPage } from "./video-chat/video-chat-page";
import { AboutPage } from "./about/about-page";

const Root: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={UnauthenticatedApp} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/doctors" exact component={DoctorSearchPage} />
          <Route path="/dashboard/:role" exact component={AppointmentPage} />
          <Route path="/video/:roomId" exact component={VideoChatPage} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Root;
