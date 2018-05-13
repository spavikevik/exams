import { Record, Map } from 'immutable';
import Course from './course';
import Exam from './exam';

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
    const enrolledCourses = Course.loadCourses(student.enrolledCourses || {});
    const exams = Exam.loadExams(student.exams || {});

    return new this(student).merge({
      id: key,
      enrolledCourses: new Map(enrolledCourses),
      exams: new Map(exams),
    });
  }

  isEnrolledCourse(courseId) {
    return this.enrolledCourses.has(courseId);
  }

  isRegisteredExam(examId) {
    return this.exams.has(examId);
  }

  setEnrolledCourses(data) {
    const enrolledCourses = new Map(Course.loadCourses(data || {}));
    return this.set('enrolledCourses', enrolledCourses);
  }

  setExams(data) {
    const exams = new Map(Exam.loadExams(data || {}));
    return this.set('exams', exams);
  }
}
