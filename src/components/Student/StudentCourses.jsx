import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { List } from 'immutable';

import withAuthorization from '../Auth/withAuthorization';
import { enrollCourse } from '../../actions/student';


class StudentCourses extends React.Component {
  static propTypes = {
    authUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    courses: PropTypes.instanceOf(List).isRequired,
    enrollCourse: PropTypes.func.isRequired,
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
    this.props.enrollCourse(this.state.enrollmentKey, this.props.authUser.uid);
  }

  render() {
    const { enrollmentKey } = this.state;
    const { courses } = this.props;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {courses.map(course =>
            (
              <Table.Row>
                <Table.Cell>{course.name}</Table.Cell>
                <Table.Cell>{course.semester}</Table.Cell>
                <Table.Cell>{course.year}</Table.Cell>
              </Table.Row>
            ))}
        </Table>
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

const mapStateToProps = state => ({
  courses: state.studentState.enrolledCourses,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  enrollCourse,
}, dispatch);

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(StudentCourses);
