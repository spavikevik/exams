import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session';
import userReducer from './user';
import facultyReducer from './faculty';
import courseReducer from './course';
import examReducer from './exam';
import studentReducer from './student';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  facultyState: facultyReducer,
  courseState: courseReducer,
  examState: examReducer,
  studentState: studentReducer,
  form: formReducer,
});

export default rootReducer;
