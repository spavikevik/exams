import { Record } from 'immutable';

const CourseRecord = Record({
  id: '',
  name: '',
  code: '',
  semester: 0,
  year: 0
});

export default class Course extends CourseRecord {}
