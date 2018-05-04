import { take, takeLatest, call, put } from 'redux-saga/effects';
import { createCourse } from '../firebase/db';
import { db } from '../firebase';
import { databaseCreatedEventChannel } from '../helpers/sagaHelpers';

function* createCourseSaga(action) {
  const { course } = action.payload;
  try {
    yield call(createCourse, course);
  } catch (e) {
    // do nothing
  }
}

export function* watchCreateCourseSaga() {
  yield takeLatest('CREATING_COURSE', createCourseSaga);
}

export function* updatedCourseSaga() {
  const updateChannel = databaseCreatedEventChannel(db.coursesRef);
  while (true) {
    const { item, key } = yield take(updateChannel);
    yield put({ type: 'UPDATING_COURSES', key, course: item });
  }
}
