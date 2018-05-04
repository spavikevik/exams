import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Grid } from 'semantic-ui-react';
import Countdown from 'react-countdown-now';

import ExamModel from '../../models/exam';
import Question from './Question';

export default class Exam extends React.Component {
  static propTypes = {
    // params: PropTypes.shape({
    //   examKey: PropTypes.string.isRequired,
    // }).isRequired,
    exam: PropTypes.instanceOf(ExamModel).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      questionPos: 0,
      answers: [],
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  submitAnswers(answer) {
    const answers = [
      ...this.state.answers,
      answer,
    ];
    console.log(answers);
  }

  nextQuestion(answer) {
    this.setState({
      questionPos: this.state.questionPos + 1,
      answers: [
        ...this.state.answers,
        answer,
      ],
    });
  }

  examtimer = ({
    hours, minutes, seconds, completed,
  }) => {
    if (completed) {
      return <span>Time is up!</span>;
    }
    return <span>{hours}:{minutes}:{seconds}</span>;
  }

  render() {
    const { exam } = this.props;
    const { questionPos } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as="h2">{exam.course}</Header>
              <Countdown
                date={Date.now() + (exam.duration * 3600000)}
                renderer={this.examtimer}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Question
                index={questionPos}
                question={exam.questions[questionPos]}
                onNextQuestion={this.nextQuestion}
                onSubmit={this.submitAnswers}
                last={(questionPos + 1) === exam.questions.length}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
