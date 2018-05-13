import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal, Icon } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import CreateExam from '../../../containers/AdminDashboard/Exams/CreateExam/CreateExam';
import RegisterStudents from './RegisterStudents';

export default class Exams extends React.Component {
  static propTypes = {
    exams: PropTypes.instanceOf(Map).isRequired,
    students: PropTypes.instanceOf(List).isRequired,
    toggleRegisterStudentForExam: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.setExamFormRef = this.setExamFormRef.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.newExam = this.newExam.bind(this);
    this.saveExam = this.saveExam.bind(this);
  }

  setExamFormRef(form) {
    this.examFormRef = form;
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  saveExam() {
    this.examFormRef.handleSubmit();
    this.toggleModal();
  }

  newExam() {
    const { modalOpen } = this.state;
    return (
      <Modal
        open={modalOpen}
        size="fullscreen"
        trigger={<Button onClick={this.toggleModal}>New</Button>}
        closeIcon
        closeOnEscape={false}
        closeOnDocumentClick={false}
        onClose={this.toggleModal}
      >
        <Modal.Header>Creating a new exam</Modal.Header>
        <Modal.Content scrolling>
          <CreateExam
            setExamFormRef={this.setExamFormRef}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            submit
            primary
            onClick={this.saveExam}
          >
            Create <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  registerStudents(exam) {
    const eligibleStudents = this.props.students
      .filter(student => student.isEnrolledCourse(exam.course));
    const { toggleRegisterStudentForExam } = this.props;
    return (
      <Modal trigger={<Button basic icon="edit" color="green" />} closeIcon>
        <Modal.Header>Registered students for {exam.name}</Modal.Header>
        <Modal.Content>
          <RegisterStudents
            examId={exam.id}
            students={eligibleStudents}
            toggleRegisterStudentForExam={toggleRegisterStudentForExam}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    const { exams } = this.props;
    return (
      <React.Fragment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Exam</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Questions</Table.HeaderCell>
              <Table.HeaderCell>Students</Table.HeaderCell>
              <Table.HeaderCell>Preview</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {exams.valueSeq().map(exam =>
              (
                <Table.Row key={exam.id}>
                  <Table.Cell>{exam.name}</Table.Cell>
                  <Table.Cell>{exam.date}</Table.Cell>
                  <Table.Cell>{exam.duration}</Table.Cell>
                  <Table.Cell>{exam.questions.length}</Table.Cell>
                  <Table.Cell>
                    { this.registerStudents(exam) }
                  </Table.Cell>
                  <Table.Cell>
                    <Button basic icon="eye" />
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
        { this.newExam() }
      </React.Fragment>
    );
  }
}
