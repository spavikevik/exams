import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal, Icon } from 'semantic-ui-react';
import { List } from 'immutable';
import CreateExam from '../../../containers/AdminDashboard/Exams/CreateExam/CreateExam';

export default class Exams extends React.Component {
  static propTypes = {
    exams: PropTypes.instanceOf(List).isRequired,
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

  render() {
    const { exams } = this.props;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Questions</Table.HeaderCell>
              <Table.HeaderCell>Students</Table.HeaderCell>
              <Table.HeaderCell>Preview</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(exams).map(exam =>
              (
                <Table.Row key={exam.id}>
                  <Table.Cell>{exam.course}</Table.Cell>
                  <Table.Cell>{exam.date}</Table.Cell>
                  <Table.Cell>
                    {exam.duration}
                  </Table.Cell>
                  <Table.Cell>
                    {exam.questions.length}
                  </Table.Cell>
                  <Table.Cell>
                    0 <Button basic icon="edit" color="green" />
                  </Table.Cell>
                  <Table.Cell>
                    <Button basic icon="eye" />
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
        { this.newExam() }
      </div>
    );
  }
}
