import { Home } from "./Home/Home";
import { Payment } from "./Payment/Payment";
import { Profile } from "./Profile";
import * as React from "react";
import "./old.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";

export const InitialRouter = () => {
  return (
    <div className="app-background">
      <Router>
        <Switch>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
