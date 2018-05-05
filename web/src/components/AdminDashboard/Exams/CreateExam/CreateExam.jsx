import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Header, Divider } from 'semantic-ui-react';
import { List } from 'immutable';
import format from 'date-fns/format';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  examTypes,
  questionTypes,
  examDurations,
} from '../../../../constants/examConstants';

import Answer from './Answer/Answer';

class CreateExam extends React.Component {
  static propTypes = {
    courses: PropTypes.instanceOf(List).isRequired,
    createExam: PropTypes.func.isRequired,
    setExamFormRef: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      date: '',
      course: '',
      duration: '',
      questions: [
        {
          type: '',
          question: '',
          answer: '',
          points: '',
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onSaveExam = this.onSaveExam.bind(this);
    this.handleDaySelection = this.handleDaySelection.bind(this);
  }

  onQuestionChange(index) {
    return (e, { name, value }) => {
      let update = {};
      if (name === 'type') {
        update = {
          [name]: value,
          answer: this.createAnswerStructure(value),
        };
      } else {
        update = {
          [name]: value,
        };
      }
      this.setState({
        questions: [
          ...this.state.questions.slice(0, index),
          {
            ...this.state.questions[index],
            ...update,
          },
          ...this.state.questions.slice(index + 1),
        ],
      });
    };
  }

  onAddQuestion() {
    this.setState({
      questions: [
        ...this.state.questions,
        {
          question: '',
          answer: '',
          correctAnswer: 1,
          points: '',
        },
      ],
    });
  }

  onRemoveQuestion(index) {
    return () => {
      this.setState({
        questions: [
          ...this.state.questions.slice(0, index),
          ...this.state.questions.slice(index + 1),
        ],
      });
    };
  }

  onSaveExam() {
    this.props.createExam({
      ...this.state,
      date: format(this.state.date, 'YYYY/MM/DD'),
    });
  }

  createAnswerStructure = (questionType) => {
    switch (questionType) {
      case 0:
        return [''];
      case 2:
        return '';
      case 3:
        return {
          input: '// Input',
          output: '// Output',
        };
      default:
        return null;
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleDaySelection(date) {
    this.setState({ date });
  }

  render() {
    const { setExamFormRef } = this.props;
    const courseOptions
      = this.props.courses
        .toArray()
        .map(course => ({ key: course.id, value: course.id, text: course.name }));
    const {
      date,
      duration,
      course,
      type,
      questions,
    } = this.state;
    return (
      <Form onSubmit={this.onSaveExam} ref={setExamFormRef}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <DayPicker
                onDayClick={this.handleDaySelection}
                selectedDays={date}
              />
              <Form.Dropdown
                name="duration"
                value={duration}
                selection
                placeholder="Exam duration"
                options={examDurations}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Form.Dropdown
                      name="course"
                      value={course}
                      search
                      selection
                      placeholder="Choose course"
                      options={courseOptions}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Form.Dropdown
                      name="type"
                      value={type}
                      selection
                      placeholder="Type"
                      options={examTypes}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Divider />

                {questions.map((question, index) => (
                  <React.Fragment>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Header className="new-question-heading" as="h3">Question {index + 1}</Header>
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Form.Select
                          name="type"
                          value={question.type}
                          options={questionTypes}
                          placeholder="Question type"
                          width={4}
                          onChange={this.onQuestionChange(index)}
                        />
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Button
                          floated="right"
                          negative
                          icon="minus"
                          onClick={this.onRemoveQuestion(index)}
                          disabled={questions.length === 1}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <Form.Group>
                          <Form.TextArea
                            name="question"
                            value={question.question}
                            rows={3}
                            label="Question text"
                            placeholder="What is a bit?"
                            onChange={this.onQuestionChange(index)}
                            width={11}
                          />
                          <Form.Input
                            name="points"
                            value={question.points}
                            label="Points"
                            placeholder="10"
                            width={4}
                            onChange={this.onQuestionChange(index)}
                          />
                        </Form.Group>
                      </Grid.Column>
                      <Grid.Column width={16}>
                        <Answer
                          questionType={question.type}
                          value={question.answer}
                          correctAnswer={question.correctAnswer}
                          onChange={this.onQuestionChange(index)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Divider />
                  </React.Fragment>
                  ))}
              </Grid>
              <Button className="new-question-button" type="button" positive icon="add" onClick={this.onAddQuestion} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default CreateExam;
