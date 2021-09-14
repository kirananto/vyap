
import * as React from "react";
import "./old.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "./redux/store";

export const InitialRouter = () => {
  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="app-background">
        <Router>
          <Routes />
        </Router>
      </div>
    </PersistGate>
  </Provider>
  );
};
