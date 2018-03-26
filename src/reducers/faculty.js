const INITIAL_STATE = {
  faculties: {},
};

const loadFaculties = (state, action) => ({
  ...state,
  faculties: action.faculties,
});

function facultyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOADING_FACULTIES':
      return loadFaculties(state, action);
    case 'UPDATING_FACULTIES':
      return {
        faculties: Object.assign({}, state.faculties, { faculty: action.faculty }),
      };
    default:
      return state;
  }
}

export default facultyReducer;
