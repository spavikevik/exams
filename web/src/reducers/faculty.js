import { List } from 'immutable';
import Faculty from '../models/faculty';

const INITIAL_STATE = {
  faculties: new List(),
};

const loadFaculties = (state, action) => ({
  ...state,
  faculties: new List(Object
    .keys(action.faculties)
    .map(key =>
      Faculty
        .fromObject(key, action.faculties[key]))),
});

function facultyReducer(state = INITIAL_STATE, action) {
  let facultyIndex = -1;
  switch (action.type) {
    case 'LOADING_FACULTIES':
      return loadFaculties(state, action);
    case 'UPDATING_FACULTIES':
      facultyIndex = state.faculties.findIndex(faculty => faculty.id === action.key);
      if (facultyIndex >= 0) {
        return {
          ...state,
          faculties: state
            .faculties
            .set(facultyIndex, Faculty.fromObject(action.key, action.faculty)),
        };
      }
      return {
        ...state,
        faculties: state.faculties.push(Faculty.fromObject(action.key, action.faculty)),
      };
    default:
      return state;
  }
}

export default facultyReducer;
