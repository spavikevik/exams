import { Record, List } from 'immutable';
import Course from './course';

const StudentRecord = Record({
  id: null,
  emailAddress: '',
  faculty: '',
  fullName: '',
  indexNumber: 0,
  enrolledCourses: new List(),
});

export default class Student extends StudentRecord {
  static fromObject(key, student) {
    const enrolledCourses = Object
      .entries(student.enrolledCourses).reduce((result, [courseKey, value]) => {
        if (courseKey !== 'enrollmentKey') {
          return [
            ...result,
            Course.fromObject(key, value),
          ];
        }
        return result;
      }, []);

    return new this(student).merge({
      id: key,
      enrolledCourses: new List(enrolledCourses || []),
    });
  }
}
