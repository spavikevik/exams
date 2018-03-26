import { fork } from 'redux-saga/effects';
import { watchCreateFacultySaga, updatedFacultySaga } from './faculty';

export default function* rootSaga() {
  yield fork(watchCreateFacultySaga);
  yield fork(updatedFacultySaga);
}
