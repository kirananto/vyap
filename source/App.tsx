
import * as React from "react";
import "./old.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from 'react-redux';
import { store } from "./redux/store";

export const InitialRouter = () => {
  return ( <Provider store={store}>
    <div className="app-background">
      <Router>
        <Routes />
      </Router>
    </div>
    </Provider>
  );
};
