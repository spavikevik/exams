import { Record } from 'immutable';

const CourseRecord = Record({
  id: '',
  name: '',
  code: '',
  semester: 0,
  year: 0,
});

export default class Course extends CourseRecord {
  static fromObject(key, course) {
    return new this(course).merge({
      id: key,
    });
  }
}
