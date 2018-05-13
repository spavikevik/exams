import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Button } from 'semantic-ui-react';

import Student from '../../models/student';

export default class StudentCourses extends React.Component {
  static propTypes = {
    authUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    student: PropTypes.instanceOf(Student).isRequired,
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
    const { student } = this.props;
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
          <Table.Body>
            {student.enrolledCourses.valueSeq().map(course =>
              (
                <Table.Row key={course.id}>
                  <Table.Cell>{course.name}</Table.Cell>
                  <Table.Cell>{course.semester}</Table.Cell>
                  <Table.Cell>{course.year}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
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

