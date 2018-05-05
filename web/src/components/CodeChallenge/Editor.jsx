import React from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    language: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    onChange: null,
    width: '800',
    height: '600',
    language: 'javascript',
    theme: 'vs',
    value: null,
  }

  onChange = (newValue, e) => {
    const { name } = this.props;
    if (this.props.onChange) {
      this.props.onChange(e, { name, value: newValue });
    }
  }

  editorDidMount = (editor /* , monaco */) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  render() {
    const {
      width,
      height,
      language,
      theme,
      value,
    } = this.props;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        width={width}
        height={height}
        language={language}
        theme={theme}
        value={value}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
