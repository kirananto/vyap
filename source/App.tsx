
import * as React from "react";
import "./old.css";

import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Firebase/UserProvider";
import Routes from "./Routes";

export const InitialRouter = () => {
  return (<UserProvider>
    <div className="app-background">
      <Router>
        <Routes />
      </Router>
    </div>
    </UserProvider>
  );
};
