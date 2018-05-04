import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid } from 'semantic-ui-react';
import { List } from 'immutable';
import format from 'date-fns/format';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class CreateExam extends React.Component {
  static propTypes = {
    courses: PropTypes.instanceOf(List).isRequired,
    createExam: PropTypes.func.isRequired,
    setExamFormRef: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.examTypes = [
      { key: 'first', value: 'first', text: 'First midterm' },
      { key: 'second', value: 'second', text: 'Second midterm' },
      { key: 'final', value: 'final', text: 'Final Exam' },
    ];
    this.questionTypes = [
      { key: 'choice', value: 'choice', text: 'Multiple choice' },
      { key: 'essay', value: 'essay', text: 'Essay' },
      { key: 'short', value: 'short', text: 'Short' },
      { key: 'code', value: 'code', text: 'Code' },
    ];
    this.examDurations = [
      { key: 1, value: 1, text: '1 hour' },
      { key: 1.5, value: 1.5, text: '1 hour 30 minutes' },
      { key: 2, value: 2, text: '2 hours' },
      { key: 2.5, value: 2.5, text: '2 hours 30 minutes' },
      { key: 3, value: 3, text: '3 hours' },
      { key: 3.5, value: 3.5, text: '3 hours 30 minutes' },
    ];
    this.state = {
      type: '',
      date: '',
      course: '',
      duration: '',
      questions: [
        {
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
      this.setState({
        questions: [
          ...this.state.questions.slice(0, index),
          {
            ...this.state.questions[index],
            [name]: value,
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
                options={this.examDurations}
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
                      options={this.examTypes}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>

                {questions.map((question, index) => (
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Form.Group>
                        <Form.TextArea
                          name="question"
                          value={question.question}
                          rows={3}
                          label={`Question ${index + 1}`}
                          placeholder="What is a bit?"
                          onChange={this.onQuestionChange(index)}
                          width={11}
                        />
                        <Form.Select
                          name="type"
                          value={question.type}
                          label="Type"
                          options={this.questionTypes}
                          placeholder="Essay"
                          width={4}
                          onChange={this.onQuestionChange(index)}
                        />
                        <Button
                          floated="right"
                          negative
                          icon="minus"
                          onClick={this.onRemoveQuestion(index)}
                          disabled={questions.length === 1}
                        />
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <Form.Group>
                        <Form.TextArea
                          name="answer"
                          value={question.answer}
                          rows={3}
                          label="Answer"
                          placeholder="A digit: 0 or 1"
                          width={11}
                          onChange={this.onQuestionChange(index)}
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
                  </Grid.Row>
                  ))}
              </Grid>
              <Button type="button" positive icon="add" onClick={this.onAddQuestion} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default CreateExam;
