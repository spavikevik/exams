const INITIAL_STATE = {
  faculties: {}
};

const loadFaculties = (state, action) => ({
  ...state,
  faculties: action.faculties
});

function facultyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'LOADING_FACULTIES': 
      return loadFaculties(state, action);
    default:
      return state;
  }
}

export default facultyReducer;