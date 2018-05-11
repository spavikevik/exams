import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Table } from 'semantic-ui-react';
import { List } from 'immutable';
import EditCourses from '../../../containers/AdminDashboard/Faculties/EditCourses';

export default class Faculties extends React.Component {
  static propTypes = {
    createFaculty: PropTypes.func.isRequired,
    faculties: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shortName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveFaculty = this.saveFaculty.bind(this);
    this.newFacultyForm = this.newFacultyForm.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  saveFaculty() {
    const { name, shortName } = this.state;
    this.props.createFaculty({ name, shortName });
  }

  newFacultyForm(name, shortName) {
    return (
      <Form onSubmit={this.saveFaculty}>
        <Form.Input placeholder="Computer Science and Engineering" name="name" value={name} onChange={this.handleChange} />
        <Form.Input placeholder="CSE" name="shortName" value={shortName} onChange={this.handleChange} />
        <Button positive type="submit">Create</Button>
      </Form>
    );
  }

  showEditCoursesModal = faculty =>
    (
      <Modal trigger={<Button basic icon="edit" color="green" />} closeIcon>
        <Modal.Header>Editing courses for faculty: {faculty.shortName}</Modal.Header>
        <Modal.Content>
          <EditCourses
            facultyId={faculty.id}
            courseIds={faculty.courseIds}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );


  render() {
    const { faculties } = this.props;
    const { name, shortName } = this.state;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Short Name</Table.HeaderCell>
              <Table.HeaderCell>Courses</Table.HeaderCell>
              <Table.HeaderCell>Lecturers</Table.HeaderCell>
              <Table.HeaderCell>Students</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(faculties).map(faculty =>
              (
                <Table.Row key={faculty.id}>
                  <Table.Cell>{faculty.name}</Table.Cell>
                  <Table.Cell>{faculty.shortName}</Table.Cell>
                  <Table.Cell>
                    {faculty.courseIds.size} {this.showEditCoursesModal(faculty)}
                  </Table.Cell>
                  <Table.Cell>
                    0 <Button basic icon="edit" color="green" />
                  </Table.Cell>
                  <Table.Cell>
                    0 <Button basic icon="edit" color="green" />
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
        { this.newFacultyForm(name, shortName) }
      </div>
    );
  }
}
