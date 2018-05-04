import { fork } from 'redux-saga/effects';
import { watchFacultySaga, updatedFacultySaga } from './faculty';
import { watchCreateCourseSaga, updatedCourseSaga } from './course';
import { watchCreateExamSaga, updatedExamSaga } from './exam';
import { watchStudentSaga } from './student';
import { watchAuth } from './auth';

export default function* rootSaga() {
  yield fork(watchStudentSaga);
  yield fork(watchFacultySaga);
  yield fork(watchCreateCourseSaga);
  yield fork(watchCreateExamSaga);
  yield fork(updatedFacultySaga);
  yield fork(updatedCourseSaga);
  yield fork(updatedExamSaga);
  yield fork(watchAuth);
}
