import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import * as routes from '../constants/routes';

const locationHelper = locationHelperBuilder({});

function getAuthUserToken(authUser) {
  return authUser.getIdTokenResult();
}

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: routes.SIGN_IN,
  authenticatedSelector: state => state.sessionState.authUser !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
});

const userIsAdmin = connectedRouterRedirect({
  redirectPath: routes.HOME,
  authenticatedSelector:
    state =>
      state.sessionState.authUser !== null &&
      state.sessionState.admin &&
      state.sessionState.accessLevel === 9,
  wrapperDisplayName: 'UserIsAdmin',
  allowRedirectBack: false,
});

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || routes.HOME,
  allowRedirectBack: false,
  authenticatedSelector: state => state.sessionState.authUser === null,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

const adminOrStudent = (Component, FailureComponent) => connectedAuthWrapper({
  authenticatedSelector:
    state =>
      state.sessionState.authUser !== null &&
      state.sessionState.admin &&
      state.sessionState.accessLevel === 9,
  wrapperDisplayName: 'AdminOrStudent',
  FailureComponent,
})(Component);

export {
  getAuthUserToken,
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAdmin,
  adminOrStudent,
};
