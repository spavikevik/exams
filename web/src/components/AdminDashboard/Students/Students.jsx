import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Table } from 'semantic-ui-react';
import { List } from 'immutable';

export default class Students extends React.Component {
  static propTypes = {
    students: PropTypes.instanceOf(List).isRequired,
    createStudent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      emailAddress: '',
      faculty: '',
      indexNumber: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudentForm = this.newStudentForm.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  saveStudent() {
    const {
      fullName,
      emailAddress,
      faculty,
      indexNumber,
    } = this.state;
    this.props.createStudent({
      fullName,
      emailAddress,
      faculty,
      indexNumber,
    });
  }

  newStudentForm(fullName, emailAddress, faculty, indexNumber) {
    return (
      <Form onSubmit={this.saveStudent}>
        <Form.Input label="Full Name" name="fullName" value={fullName} onChange={this.handleChange} />
        <Form.Input label="E-mail Address" name="emailAddress" value={emailAddress} onChange={this.handleChange} />
        <Form.Input label="Faculty" name="faculty" value={faculty} onChange={this.handleChange} />
        <Form.Input label="Index number" name="indexNumber" value={indexNumber} onChange={this.handleChange} />
        <Button positive type="submit">Create</Button>
      </Form>
    );
  }

  render() {
    const {
      fullName,
      emailAddress,
      faculty,
      indexNumber,
    } = this.state;
    const { students } = this.props;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Full Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail Address</Table.HeaderCell>
              <Table.HeaderCell>Faculty</Table.HeaderCell>
              <Table.HeaderCell>Index number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {students.map(student =>
            (
              <Table.Row>
                <Table.Cell>{student.fullName}</Table.Cell>
                <Table.Cell>{student.emailAddress}</Table.Cell>
                <Table.Cell>{student.faculty}</Table.Cell>
                <Table.Cell>{student.indexNumber}</Table.Cell>
              </Table.Row>
            ))}
        </Table>

        { this.newStudentForm(fullName, emailAddress, faculty, indexNumber) }
      </div>
    );
  }
}
