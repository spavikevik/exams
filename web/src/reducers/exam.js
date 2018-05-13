import { Map } from 'immutable';
import Exam from '../models/exam';

const INITIAL_STATE = {
  exams: new Map(),
};


function examReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATING_EXAMS':
      return Object.assign(
        {},
        state,
        {
          exams: state.exams.set(action.key, Exam.fromObject(action.key, action.item)),
        },
      );
    default:
      return state;
  }
}

export default examReducer;
