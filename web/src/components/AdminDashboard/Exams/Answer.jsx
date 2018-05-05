import React from 'react';
import PropTypes from 'prop-types';
// import { Form } from 'semantic-ui-react';

import MultipleChoice from './Answers/MultipleChoice';
import Short from './Answers/Short';
import Code from './Answers/Code';

export default class Answer extends React.Component {
  static propTypes = {
    questionType: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    correctAnswer: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  renderAnswerInput = (questionType, value, correctAnswer) => {
    const { onChange } = this.props;
    switch (questionType) {
      case 0:
        return (<MultipleChoice
          onChange={onChange}
          value={value}
          correctAnswer={correctAnswer}
        />);
      case 2:
        return (<Short
          onChange={onChange}
          value={value}
        />);
      case 3:
        return (<Code
          onChange={onChange}
          value={value}
        />);
      default:
        return null;
    }
  }

  render() {
    const { questionType, value, correctAnswer } = this.props;
    return (
      this.renderAnswerInput(questionType, value, correctAnswer)
    );
  }
}

