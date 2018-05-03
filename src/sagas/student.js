import { call, takeLatest, take, put, select, race } from 'redux-saga/effects';
import { enrollCourse } from '../firebase/db';
import { db } from '../firebase';
import { databaseCreatedEventChannel, databaseUpdatedEventChannel } from '../helpers/sagaHelpers';

const getAuthUser = state => state.sessionState.authUser;

function* enrollStudentToCourse(action) {
  const { enrollmentKey, studentId } = action.payload;
  try {
    yield call(enrollCourse, studentId, enrollmentKey);
  } catch (e) {
    // do nothing
  }
}

export function* updatedStudentSaga() {
  const user = yield select(getAuthUser);
  if (user !== null) {
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
}

export function* watchStudentSaga() {
  yield [
    takeLatest('ENROLLING_STUDENT_COURSE', enrollStudentToCourse),
    takeLatest('SETTING_AUTH_USER', updatedStudentSaga),
  ];
}
