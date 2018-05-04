import { Record, List } from 'immutable';

const ExamRecord = Record({
  id: '',
  course: '',
  duration: 0,
  date: '',
  questions: new List(),
});

export default class Exam extends ExamRecord {
  static fromObject(key, exam) {
    return new this(exam).merge({
      id: key,
    });
  }
}
