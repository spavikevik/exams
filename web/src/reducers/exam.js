import { List } from 'immutable';
import Exam from '../models/exam';

const INITIAL_STATE = {
  exams: new List(),
};


function examReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATING_EXAMS':
      return Object.assign(
        {},
        state,
        {
          exams: state.exams.push(Exam.fromObject(action.key, action.item)),
        },
      );
    default:
      return state;
  }
}

export default examReducer;
