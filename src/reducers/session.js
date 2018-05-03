const INITIAL_STATE = {
  admin: false,
  accessLevel: 0,
  authUser: null,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  admin: action.claims.admin,
  accessLevel: action.claims.accessLevel,
  authUser: action.authUser || null,
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SETTING_AUTH_USER': {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}

export default sessionReducer;
