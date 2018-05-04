import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button } from 'semantic-ui-react';
import EssayQuestion from './EssayQuestion';

export default class Question extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    onNextQuestion: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    last: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
  }

  onSubmitAnswer() {
    if (this.props.last) {
      this.props.onSubmit(this.state.answer);
      return;
    }
    this.props.onNextQuestion(this.state.answer);
    this.setState({
      answer: '',
    });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { question, last } = this.props;
    const { answer } = this.state;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form onSubmit={this.onSubmitAnswer}>
              <EssayQuestion
                question={question.question}
                answer={answer}
                handleChange={this.handleChange}
              />
              <Button
                size="huge"
                primary
              >{last ? 'Finish' : 'Next question'}
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
