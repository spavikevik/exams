import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { onceGetCourses } from '../firebase/db';

class CreateExam extends React.Component {
  static propTypes = {
    onFetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props) {
    super(props);
    this.questionTypes = [
      { key: 'choice', value: 'choice', text: 'Multiple choice' },
      { key: 'essay', value: 'essay', text: 'Essay' },
      { key: 'short', value: 'short', text: 'Short' },
      { key: 'code', value: 'code', text: 'Code' },
    ];
    this.state = {
      course: '',
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
  }

  componentWillMount() {
    const { onFetchCourses } = this.props;

    onceGetCourses().then(snapshot => onFetchCourses(snapshot.val()));
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

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const courseOptions = Object.keys(this.props.courses).map((key) => {
      const { name } = this.props.courses[key];
      return { key, value: key, text: name };
    });
    const { course, questions } = this.state;
    console.log(questions);
    return (
      <Form>
        <Form.Dropdown
          name="course"
          value={course}
          search
          selection
          placeholder="Choose course"
          options={courseOptions}
          onChange={this.handleChange}
        />

        {questions.map((question, index) => (
          <Form.Group>
            <Form.TextArea
              name="question"
              rows={3}
              label="Question"
              placeholder="What is a bit?"
              width={12}
              onChange={this.onQuestionChange(index)}
            />
            <Form.Select
              name="type"
              label="Type"
              options={this.questionTypes}
              placeholder="Essay"
              width={4}
              onChange={this.onQuestionChange(index)}
            />
            <Form.Input
              name="answer"
              label="Answer"
              placeholder="A digit: 0 or 1"
              width={10}
              onChange={this.onQuestionChange(index)}
            />
            <Form.Input
              name="points"
              label="Points"
              placeholder="10"
              width={1}
              onChange={this.onQuestionChange(index)}
            />
            <Button negative icon="minus" onClick={this.onRemoveQuestion(index)} disabled={questions.length === 1} />
          </Form.Group>
          ))}
        <Button positive icon="add" onClick={this.onAddQuestion} />
        <Button type="submit">Save</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courseState.courses,
});

const mapDispatchToProps = dispatch => ({
  onFetchCourses: courses => dispatch({ type: 'LOADING_COURSES', courses }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateExam);
