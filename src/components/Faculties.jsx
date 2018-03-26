import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Table } from 'semantic-ui-react';
import { List } from 'immutable';

import { onceGetFaculties } from '../firebase/db';

class Faculties extends React.Component {
  static propTypes = {
    onFetchFaculties: PropTypes.func.isRequired,
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

  componentWillMount() {
    const { onFetchFaculties } = this.props;

    onceGetFaculties().then(snapshot => onFetchFaculties(snapshot.val()));
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
        <Button type="submit">Save</Button>
      </Form>
    );
  }

  render() {
    const { name, shortName } = this.state;
    const { faculties } = this.props;
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
            {Object.keys(faculties).map(key =>
              (
                <Table.Row>
                  <Table.Cell>{faculties[key].name}</Table.Cell>
                  <Table.Cell>{faculties[key].shortName}</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                </Table.Row>
            ))}
          </Table.Header>
        </Table>
        { this.newFacultyForm(name, shortName) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  faculties: state.facultyState.faculties,
});

const mapDispatchToProps = dispatch => ({
  onFetchFaculties: faculties => dispatch({ type: 'LOADING_FACULTIES', faculties }),
  createFaculty: faculty => dispatch({ type: 'CREATING_FACULTY', payload: { faculty } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faculties);
