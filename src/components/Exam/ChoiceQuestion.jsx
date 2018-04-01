import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Radio, Button } from 'semantic-ui-react';

export default class ChoiceQuestion extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      answer: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { question, choices } = this.props;
    const { answer } = this.state;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form>
              <Form.Group>
                {question}
                {choices
                  .map(choice => (<Form.Field
                    name="answer"
                    control={Radio}
                    label={choice.label}
                    value={choice.value}
                    checked={answer === choice.value}
                    onChange={this.handleChange}
                  />))}
              </Form.Group>
              <Button size="huge" primary>Next question</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
