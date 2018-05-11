import { fork } from 'redux-saga/effects';
import { watchStudentSaga } from './student';
import { watchAuth } from './auth';
import { updatedItemSaga, watchItemSaga } from './database';

export default function* rootSaga() {
  yield fork(watchStudentSaga);
  yield fork(watchItemSaga);
  yield fork(watchAuth);
  yield fork(updatedItemSaga);
}
