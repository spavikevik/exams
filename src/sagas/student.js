import { call, takeLatest, take, put, select, race } from 'redux-saga/effects';
import { enrollCourse } from '../firebase/db';
import { db } from '../firebase';
import { databaseCreatedEventChannel, databaseUpdatedEventChannel } from '../helpers/sagaHelpers';

const getUserId = state => state.sessionState.authUser;

export function* enrollStudentToCourse(action) {
  const { enrollmentKey, studentId } = action.payload;
  try {
    yield call(enrollCourse, studentId, enrollmentKey);
  } catch (e) {
    // do nothing
  }
}

export function* watchStudentSaga() {
  yield [
    takeLatest('ENROLLING_STUDENT_COURSE', enrollStudentToCourse),
  ];
}

export function* updatedStudentSaga() {
  yield take('AUTH_USER_SET');
  const user = yield select(getUserId);
  const createChannel = databaseCreatedEventChannel(db.studentsRef.child(user.uid));
  const updateChannel = databaseUpdatedEventChannel(db.studentsRef.child(user.uid));
  while (true) {
    const { create, update } = yield race({
      create: take(createChannel),
      update: take(updateChannel),
    });
    const { key, item } = create || update;
    yield put({ type: 'UPDATING_STUDENT', key, data: item });
  }
}
