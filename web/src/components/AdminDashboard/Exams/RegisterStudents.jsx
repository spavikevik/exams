import React from 'react';
import PropTypes from 'prop-types';
import { List, Checkbox } from 'semantic-ui-react';
import { List as ImmutableList } from 'immutable';

export default class RegisterStudents extends React.Component {
  static propTypes = {
    examId: PropTypes.string.isRequired,
    students: PropTypes.instanceOf(ImmutableList).isRequired,
    toggleRegisterStudentForExam: PropTypes.func.isRequired,
  }

  toggleRegisterStudent(studentId) {
    const { examId, toggleRegisterStudentForExam } = this.props;
    return (event, { checked }) => {
      toggleRegisterStudentForExam(examId, studentId, checked);
    };
  }

  render() {
    const { students, examId } = this.props;
    return (
      <List divided>
        {students.map(student => (
          <List.Item key={student.id}>
            <List.Content floated="left">{student.fullName} ({student.indexNumber})</List.Content>
            <List.Content floated="right">
              <Checkbox
                toggle
                onChange={this.toggleRegisterStudent(student.id)}
                checked={student.isRegisteredExam(examId)}
              />
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
