import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form } from 'semantic-ui-react';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.setOptsNum = this.setOptsNum.bind(this);
    this.setOption = this.setOption.bind(this);
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
  }

  setCorrectAnswer(e, { value }) {
    this.props.onChange(e, { name: 'correctAnswer', value });
  }

  setOptsNum(options) {
    const { onChange } = this.props;
    const size = options.length;
    const result = options;
    return (e, { value }) => {
      if (size > value) {
        result.splice(value, size - value);
      } else if (size < value) {
        result.push(...Array.from({ length: value - size }, () => ''));
      } else {
        return;
      }
      onChange(e, { name: 'answer', value: result });
    };
  }

  setOption(options) {
    const { onChange } = this.props;
    const result = options;
    return (e, { name, value }) => {
      result[name] = value;
      onChange(e, { name: 'answer', value: result });
    };
  }

  optionsNum = Array.from({ length: 5 }, (x, i) => ({
    key: i + 1,
    value: i + 1,
    text: i + 1,
  }))

  render() {
    const { value, correctAnswer } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form>
              <Form.Dropdown
                label="Options number"
                selection
                options={this.optionsNum}
                onChange={this.setOptsNum(value)}
                value={value.length}
              />
              <Form.Dropdown
                label="Correct answer"
                selection
                options={this.optionsNum.slice(0, value.length)}
                onChange={this.setCorrectAnswer}
                value={correctAnswer}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          { value.map((option, i) => (
            <Grid.Column width={16}>
              <Form.TextArea
                rows={2}
                name={i}
                value={option}
                label={`Choice ${i + 1}`}
                onChange={this.setOption(value)}
                className="new-question-answer"
              />
            </Grid.Column>
              )) }
        </Grid.Row>
      </Grid>
    );
  }
}
