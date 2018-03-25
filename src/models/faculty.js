import { Record, List } from 'immutable';

const FacultyRecord = Record({
  id: '',
  courseIds: new List(),
});

export default class Faculty extends FacultyRecord {}
