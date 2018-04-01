import { List } from 'immutable';
import Course from '../models/course';

const INITIAL_STATE = {
  courses: new List(),
};

const loadCourses = (state, action) => ({
  ...state,
  courses: new List(Object
    .keys(action.courses)
    .map(key =>
      Course
        .fromObject(key, action.courses[key]))),
});

function courseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOADING_COURSES':
      return loadCourses(state, action);
    case 'UPDATING_COURSES':
      return {
        ...state,
        courses: state.courses.push(Course.fromObject(action.key, action.course)),
      };
    default:
      return state;
  }
}

export default courseReducer;
