import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import Landing from './Landing';
import Signup from './Signup';
import Signin from './Signin';
import PasswordForget from './PasswordForget';
import Home from './Home';
import Account from './Account';
import Faculties from './Faculties';
import Courses from './Courses';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>
  (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={routes.LANDING} component={() => <Landing />} />
        <Route exact path={routes.SIGN_UP} component={() => <Signup />} />
        <Route exact path={routes.SIGN_IN} component={() => <Signin />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForget />} />
        <Route exact path={routes.HOME} component={() => <Home />} />
        <Route exact path={routes.ACCOUNT} component={() => <Account />} />
        <Route exact path={routes.FACULTIES} component={() => <Faculties />} />
        <Route exact path={routes.COURSES} component={() => <Courses />} />
      </div>
    </Router>
  );

export default withAuthentication(App);
