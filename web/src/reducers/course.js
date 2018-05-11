import { List } from 'immutable';
import Course from '../models/course';

const INITIAL_STATE = {
  courses: new List(),
};

function courseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATING_COURSES':
      return Object.assign(
        state,
        { courses: state.courses.push(Course.fromObject(action.key, action.item)) },
      );
    default:
      return state;
  }
}

export default courseReducer;
