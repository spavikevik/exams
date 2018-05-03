import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import { getCourseBySecretKey } from '../../firebase/db';

import User from '../../models/user';

export default class Account extends React.Component {
  static propTypes = {
    authUser: PropTypes.instanceOf(User).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      enrollmentKey: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.enrollCourse = this.enrollCourse.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  enrollCourse() {
    getCourseBySecretKey(this.state.enrollmentKey);
  }

  render() {
    const { enrollmentKey } = this.state;
    return (
      <div>
        <h1>Account: {this.props.authUser.email}</h1>
        <Form onSubmit={this.enrollCourse}>
          <Form.Input
            label="Enrollment key"
            name="enrollmentKey"
            value={enrollmentKey}
            type="password"
            width={4}
            onChange={this.handleChange}
          />
          <Button>Enroll</Button>
        </Form>
      </div>
    );
  }
}
