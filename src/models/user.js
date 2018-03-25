import { Record, List } from 'immutable';
import Faculty from './faculty';

const UserRecord = Record({
  id: '',
  name: '',
  role: '',
  email: '',
  faculty: new Faculty(),
  exams: new List(),
  takenExams: new List(),
});

export default class User extends UserRecord {}
