import { Record, Map } from 'immutable';
import Course from './course';

const StudentRecord = Record({
  id: null,
  emailAddress: '',
  faculty: '',
  fullName: '',
  indexNumber: 0,
  exams: new Map(),
  enrolledCourses: new Map(),
});

export default class Student extends StudentRecord {
  static fromObject(key, student) {
    const enrolledCourses = student.enrolledCourses || {};
    Object.keys(enrolledCourses).forEach((courseKey) => {
      if (courseKey === 'enrollmentKey') {
        enrolledCourses[key] = undefined;
      } else {
        enrolledCourses[courseKey] = Course.fromObject(courseKey, enrolledCourses[courseKey]);
      }
    });

    return new this(student).merge({
      id: key,
      enrolledCourses: new Map(enrolledCourses),
      exams: new Map(student.exams || {}),
    });
  }

  isEnrolledCourse(courseId) {
    return this.enrolledCourses.has(courseId);
  }

  isRegisteredExam(examId) {
    return this.exams.has(examId);
  }
}
