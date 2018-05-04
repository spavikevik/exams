import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { List } from 'immutable';
import NewCourse from './NewCourse';

export default class Courses extends React.Component {
  static propTypes = {
    courses: PropTypes.instanceOf(List).isRequired,
    createCourse: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  saveCourse = (values) => {
    this.props.createCourse(values);
  }

  render() {
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
              <Table.HeaderCell>Enrollment key</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {courses.map(course =>
            (
              <Table.Row>
                <Table.Cell>{course.name}</Table.Cell>
                <Table.Cell>{course.code}</Table.Cell>
                <Table.Cell>{course.semester}</Table.Cell>
                <Table.Cell>{course.year}</Table.Cell>
                <Table.Cell>{course.secretKey}</Table.Cell>
              </Table.Row>
            ))}
        </Table>
        <NewCourse onSubmit={this.saveCourse} />
      </div>
    );
  }
}
