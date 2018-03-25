import { Record, List } from 'immutable';

const ExamRecord = Record({
  id: '',
  courseId: '',
  questions: new List(),
});

export default class Exam extends ExamRecord {}
