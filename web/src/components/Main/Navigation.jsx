import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Menu } from 'semantic-ui-react';

// import Signout from './Signout';
import * as routes from '../../constants/routes';

export default class Navigation extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    session: PropTypes.shape({
      authUser: PropTypes.object,
      admin: PropTypes.bool,
      accessLevel: PropTypes.number,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.onItemClick.bind(this);
    this.authenticated.bind(this);
    this.nonAuthenticated.bind(this);
  }

  state = { activeItem: 'home' };

  onItemClick(path) {
    return (e, { name }) => {
      this.setState({ activeItem: name });
      this.props.history.push(path);
    };
  }

  authenticated(activeItem) {
    return (
      <Menu color="blue" pointing secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.onItemClick(routes.HOME)} />
        <Menu.Item name="account" active={activeItem === 'account'} onClick={this.onItemClick(routes.ACCOUNT)} />
        <Menu.Item name="dashboard" active={activeItem === 'dashboard'} onClick={this.onItemClick(routes.DASHBOARD)} />
      </Menu>
    );
  }

  nonAuthenticated(activeItem) {
    return (
      <Menu color="blue" pointing secondary>
        <Menu.Item name="landing" active={activeItem === 'lading'} onClick={this.onItemClick(routes.LANDING)} />
        <Menu.Item name="signin" active={activeItem === 'signin'} onClick={this.onItemClick(routes.SIGN_IN)} />
      </Menu>
    );
  }

  render() {
    const { authUser } = this.props.session;
    const { activeItem } = this.state;
    return (
      authUser ? this.authenticated(activeItem)
        : this.nonAuthenticated(activeItem)
    );
  }
}
