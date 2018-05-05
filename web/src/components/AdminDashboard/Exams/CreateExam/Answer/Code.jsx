import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Editor from '../../../../CodeChallenge/Editor';

export default class Code extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      input: PropTypes.string.isRequired,
      output: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onChange(valueObj) {
    return (e, { name, value }) => {
      const result = {
        ...valueObj,
        [name]: value,
      };

      this.props.onChange(e, { name: 'answer', value: result });
    };
  }

  render() {
    const { value } = this.props;
    return (
      <div className="new-question-answer">
        <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <Editor
                name="input"
                value={value.input}
                width="300"
                height="100"
                onChange={this.onChange(value)}
              />
            </Grid.Column>

            <Grid.Column width={7}>
              <Editor
                name="output"
                value={value.output}
                width="300"
                height="100"
                onChange={this.onChange(value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

