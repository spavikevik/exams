import { List } from 'immutable';
import Faculty from '../models/faculty';

const INITIAL_STATE = {
  faculties: new List(),
};

function facultyReducer(state = INITIAL_STATE, action) {
  let facultyIndex = -1;
  let faculties;
  switch (action.type) {
    case 'UPDATING_FACULTIES':
      facultyIndex = state.faculties.findIndex(faculty => faculty.id === action.key);
      if (facultyIndex >= 0) {
        faculties = state
          .faculties
          .set(facultyIndex, Faculty.fromObject(action.key, action.item));
      } else {
        faculties = state.faculties.push(Faculty.fromObject(action.key, action.item));
      }
      return Object.assign({}, state, { faculties });
    default:
      return state;
  }
}

export default facultyReducer;
