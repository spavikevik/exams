import { List } from 'immutable';
import Exam from '../models/exam';

const INITIAL_STATE = {
  exams: new List(),
};

const loadExams = (state, action) => ({
  ...state,
  exams: new List(Object
    .keys(action.exams)
    .map(key =>
      Exam
        .fromObject(key, action.exams[key]))),
});

function examReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOADING_EXAMS':
      return loadExams(state, action);
    case 'UPDATING_EXAMS':
      return {
        ...state,
        exams: state.exams.push(Exam.fromObject(action.key, action.exam)),
      };
    default:
      return state;
  }
}

export default examReducer;
