import { race, take, takeLatest, call, put } from 'redux-saga/effects';
import { createFaculty, updateFaculty } from '../firebase/db';
import { db } from '../firebase';
import { databaseCreatedEventChannel, databaseUpdatedEventChannel } from '../helpers/sagaHelpers';

function* createFacultySaga(action) {
  const { faculty } = action.payload;
  try {
    yield call(createFaculty, faculty);
  } catch (e) {
    // do nothing
  }
}

function* updateFacultySaga(action) {
  const { id, fields } = action.payload;
  try {
    yield call(updateFaculty, id, fields);
  } catch (e) {
    // do nothing
  }
}

export function* watchFacultySaga() {
  yield [
    takeLatest('CREATING_FACULTY', createFacultySaga),
    takeLatest('UPDATING_FACULTY', updateFacultySaga),
  ];
}

export function* updatedFacultySaga() {
  const createChannel = databaseCreatedEventChannel(db.facultiesRef);
  const updateChannel = databaseUpdatedEventChannel(db.facultiesRef);
  while (true) {
    const { create, update } = yield race({
      create: take(createChannel),
      update: take(updateChannel),
    });
    const { key, item } = create || update;
    yield put({ type: 'UPDATING_FACULTIES', key, faculty: item });
  }
}
