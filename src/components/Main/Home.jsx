import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import User from '../../models/user';

export default class Home extends Component {
  static propTypes = {
    onSetUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
  };

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val()));
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  (
    <div>
      <h2>List of Usernames of Users</h2>
      <p>(Saved on Sign Up in Firebase Database)</p>

      {Object.keys(users).map(key =>
        <div key={key}>{users[key].username}</div>)}
    </div>
  );

UserList.propTypes = {
  users: PropTypes.arrayOf(User).isRequired,
};

