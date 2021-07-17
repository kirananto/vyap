import { Home } from './Home';
import { Payment } from './Payment';
import { Profile } from './Profile';
import * as React from 'react';
import './old.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const InitialRouter = () => {
  return (<Router>
    <Switch>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
  );
}
