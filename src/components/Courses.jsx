import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Table } from 'semantic-ui-react';
import { List } from 'immutable';

export default class Courses extends React.Component {
  static propTypes = {
    courses: PropTypes.instanceOf(List).isRequired,
    createCourse: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      semester: '',
      year: '',
      secretKey: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.newCourseForm = this.newCourseForm.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  saveCourse() {
    this.props.createCourse(this.state);
  }

  newCourseForm(name, code, semester, year, secretKey) {
    return (
      <Form onSubmit={this.saveCourse}>
        <Form.Input
          label="Course name"
          placeholder="Mathematics 1"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Code name"
          placeholder="MAT001"
          name="code"
          value={code}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Semester"
          placeholder="Winter"
          name="semester"
          value={semester}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Study year"
          placeholder="2018"
          name="year"
          value={year}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Enrollment key"
          placeholder="Input a secret key here"
          name="secretKey"
          value={secretKey}
          onChange={this.handleChange}
        />
        <Button positive type="submit">Create</Button>
      </Form>
    );
  }

  render() {
    const {
      name, code, semester, year, secretKey,
    } = this.state;
    const { courses } = this.props;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
            </Table.Row>
            {courses.map(course =>
              (
                <Table.Row>
                  <Table.Cell>{course.name}</Table.Cell>
                  <Table.Cell>{course.code}</Table.Cell>
                  <Table.Cell>{course.semester}</Table.Cell>
                  <Table.Cell>{course.year}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Header>
        </Table>
        { this.newCourseForm(name, code, semester, year, secretKey) }
      </div>
    );
  }
}
