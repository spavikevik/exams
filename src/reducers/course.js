const INITIAL_STATE = {
  courses: {}
};

const loadCourses = (state, action) => ({
  ...state,
  courses: action.courses
});

function courseReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'LOADING_COURSES': 
      return loadCourses(state, action);
    default:
      return state;
  }
}

export default courseReducer;