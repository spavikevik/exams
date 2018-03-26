import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Table } from 'semantic-ui-react';
import { List } from 'immutable';

import { createCourse, onceGetCourses } from '../firebase/db';

class Courses extends React.Component {
  static propTypes = {
    onFetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      semester: '',
      year: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.newCourseForm = this.newCourseForm.bind(this);
  }

  componentWillMount() {
    const { onFetchCourses } = this.props;

    onceGetCourses().then(snapshot => onFetchCourses(snapshot.val()));
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  saveCourse() {
    const {
      name, code, semester, year,
    } = this.state;
    createCourse(name, code, semester, year);
  }

  newCourseForm(name, code, semester, year) {
    return (
      <Form onSubmit={this.saveCourse}>
        <Form.Input placeholder="Mathematics 1" name="name" value={name} onChange={this.handleChange} />
        <Form.Input placeholder="MAT001" name="code" value={code} onChange={this.handleChange} />
        <Form.Input placeholder="winter" name="semester" value={semester} onChange={this.handleChange} />
        <Form.Input placeholder="2018" name="year" value={year} onChange={this.handleChange} />
        <Button type="submit">Save</Button>
      </Form>
    );
  }

  render() {
    const {
      name, code, semester, year,
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
            {Object.keys(courses).map(key =>
              (
                <Table.Row>
                  <Table.Cell>{courses[key].name}</Table.Cell>
                  <Table.Cell>{courses[key].code}</Table.Cell>
                  <Table.Cell>{courses[key].semester}</Table.Cell>
                  <Table.Cell>{courses[key].year}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Header>
        </Table>
        { this.newCourseForm(name, code, semester, year) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courseState.courses,
});

const mapDispatchToProps = dispatch => ({
  onFetchCourses: courses => dispatch({ type: 'LOADING_COURSES', courses }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
