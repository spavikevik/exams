import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';
import User from '../../models/user';

const withAuthorization = condition => (Component) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      history: ReactRouterPropTypes.history.isRequired,
      authUser: PropTypes.instanceOf(User).isRequired,
    };

    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;
