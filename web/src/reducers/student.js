import { List } from 'immutable';
import Course from '../models/course';

const INITIAL_STATE = {
  enrolledCourses: new List(),
};

const loadCourses = (state, action) => ({
  ...state,
  enrolledCourses: new List(Object
    .keys(action.enrolledCourses)
    .map(key =>
      Course
        .fromObject(key, action.enrolledCourses[key]))),
});

function studentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATING_STUDENT':
      if (action.key === 'enrolledCourses') {
        const courses = Object.entries(action.data).reduce((result, [key, value]) => {
          if (key !== 'enrollmentKey') {
            return [
              ...result,
              Course.fromObject(key, value),
            ];
          }
          return result;
        }, []);
        return {
          ...state,
          enrolledCourses: new List(courses),
        };
      }
      return state;
    case 'LOADING_ENROLLED_COURSES':
      return loadCourses(state, action);
    case 'UPDATING_ENROLLED_COURSES':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.push(Course.fromObject(action.key, action.course)),
      };
    default:
      return state;
  }
}

export default studentReducer;
