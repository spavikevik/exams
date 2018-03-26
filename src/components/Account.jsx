import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import User from '../models/user';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChangeForm';
import withAuthorization from './withAuthorization';

const propTypes = {
  authUser: PropTypes.instanceOf(User).isRequired,
};

const Account = ({ authUser }) =>
  (
    <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );

Account.propTypes = propTypes;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
)(Account);
