import { Record, List } from 'immutable';

const FacultyRecord = Record({
  id: '',
  name: '',
  shortName: '',
  courseIds: new List(),
});

export default class Faculty extends FacultyRecord {
  static fromObject(key, faculty) {
    return new this(faculty).merge({
      id: key,
      courseIds: new List(faculty.courseIds || []),
    });
  }
}
