import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import Student from '../../models/student';

export default class Exams extends React.Component {
  static propTypes = {
    student: PropTypes.instanceOf(Student).isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { student } = this.props;
    return (
      <React.Fragment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Exam</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {student.exams.valueSeq().map(exam =>
              (
                <Table.Row key={exam.id}>
                  <Table.Cell>{exam.name}</Table.Cell>
                  <Table.Cell>{exam.type}</Table.Cell>
                  <Table.Cell>{exam.date}</Table.Cell>
                  <Table.Cell>{exam.duration}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

