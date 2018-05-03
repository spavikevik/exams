import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import generator from 'generate-password';

const generateSecretKey = () => generator.generate({
  length: 14,
  numbers: true,
  uppercase: true,
});

class NewCourse extends React.Component {
  static propTypes = {
    reset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.onSubmit(values);
    this.props.reset();
    this.props.change('secretKey', generateSecretKey());
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          component={Form.Input}
          label="Course name"
          placeholder="Mathematics 1"
          name="name"
        />
        <Field
          component={Form.Input}
          label="Code name"
          placeholder="MAT001"
          name="code"
        />
        <Field
          component={Form.Input}
          label="Semester"
          placeholder="Winter"
          name="semester"
        />
        <Field
          component={Form.Input}
          label="Study year"
          placeholder="2018"
          name="year"
        />
        <Field
          component={Form.Input}
          label="Enrollment key"
          placeholder="Input a secret key here"
          name="secretKey"
        />
        <Button positive type="submit">Create</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'newCourse',
  initialValues: {
    secretKey: generateSecretKey(),
  },
})(NewCourse);
