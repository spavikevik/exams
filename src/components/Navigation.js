import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Signout from './Signout';
import * as routes from '../constants/routes';

const NavigationAuthenticated = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><Signout /></li>
    </ul>
  </div>

const NavigationNonAuthenticated = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuthenticated />
        : <NavigationNonAuthenticated />
    }
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);