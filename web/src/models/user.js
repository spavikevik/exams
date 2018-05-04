import { Record, List } from 'immutable';
import Faculty from './faculty';

const UserRecord = Record({
  uid: -1,
  displayName: '',
  email: '',
  faculty: new Faculty(),
  exams: new List(),
  takenExams: new List(),
});

export default class User extends UserRecord {
  isAuthenticated() {
    return this.uid !== -1 && this.email;
  }
}
