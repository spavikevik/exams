import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Editor from '../CodeChallenge/Editor';

const languageOptions = [
  { key: 0, value: 'ruby', text: 'Ruby' },
  { key: 1, value: 'javascript', text: 'JavaScript' },
  { key: 2, value: 'c', text: 'C' },
  { key: 3, value: 'cpp', text: 'C++' },
  { key: 4, value: 'csharp', text: 'C#' },
  { key: 5, value: 'java', text: 'Java' },
];

const CodeQuestion = () => (
  <div>
    <Dropdown placeholder="Language" search selection options={languageOptions} />
    <Editor />
  </div>
);

export default CodeQuestion;
