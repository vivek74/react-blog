import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
// importing pages
import LandingPage from './containers/LandingPage/LandingPage';
import {Register} from './containers/Register/Register';
import {Blog} from './containers/Blog/Blog';

import jwt_decode from "jwt-decode";
import {setAuthToken} from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from './store/actions/authTypes';
import store from "./store";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./register";
  }
}

function App() {
  return (
    <Switch>
        <Route exact={true} path='/' component={LandingPage} />
        <Route exact={true} path='/register' component={Register} />
        <Route exact={true} path='/:id' component={Blog} />
    </Switch>
  );
}

export default withRouter((App));
