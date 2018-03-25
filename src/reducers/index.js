import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import facultyReducer from './faculty';
import courseReducer from './course';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  facultyState: facultyReducer,
  courseState: courseReducer,
});

export default rootReducer;