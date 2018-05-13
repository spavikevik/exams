import { fork } from 'redux-saga/effects';
import { watchStudentSaga } from './student';
import { watchAuth } from './auth';
import { updatedItemSaga, watchItemSaga } from './database';
import { watchExamSaga } from './exam';

export default function* rootSaga() {
  yield fork(watchStudentSaga);
  yield fork(watchItemSaga);
  yield fork(watchExamSaga);
  yield fork(watchAuth);
  yield fork(updatedItemSaga);
}
