import { take, takeLatest, call, put } from 'redux-saga/effects';
import { createExam } from '../firebase/db';
import { db } from '../firebase';
import { databaseCreatedEventChannel } from '../helpers/sagaHelpers';

function* createExamSaga(action) {
  const { exam } = action.payload;
  try {
    yield call(createExam, exam);
  } catch (e) {
    // do nothing
  }
}

export function* watchCreateExamSaga() {
  yield takeLatest('CREATING_EXAM', createExamSaga);
}

export function* updatedExamSaga() {
  const updateChannel = databaseCreatedEventChannel(db.examsRef);
  while (true) {
    const { item, key } = yield take(updateChannel);
    yield put({ type: 'UPDATING_EXAMS', key, exam: item });
  }
}
