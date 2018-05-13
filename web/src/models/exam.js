import { Record, List, Map } from 'immutable';

const ExamRecord = Record({
  id: '',
  name: '',
  course: '',
  duration: 0,
  date: '',
  registeredStudents: new Map(),
  questions: new List(),
});

export default class Exam extends ExamRecord {
  static fromObject(key, exam) {
    return new this(exam).merge({
      id: key,
      registeredStudents: new Map(exam.registeredStudents || {}),
    });
  }
}
