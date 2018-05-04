import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const EssayQuestion = ({ answer, question, handleChange }) =>
  (<Form.TextArea
    name="answer"
    value={answer}
    label={question}
    onChange={handleChange}
  />);

EssayQuestion.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EssayQuestion;
