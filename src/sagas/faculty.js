import { take, takeLatest, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { createFaculty } from '../firebase/db';
import { db as database } from '../firebase/firebase';

function createEventChannel() {
  const listener = eventChannel((emit) => {
    database.ref('faculties')
      .on(
        'child_added',
        data => emit(data.val()),
      );
    return () => database.ref('faculties').off(listener);
  });
  return listener;
}

function* createFacultySaga(action) {
  const { faculty } = action.payload;
  try {
    yield call(createFaculty, faculty);
  } catch (e) {
    // do nothing
  }
}

export function* watchCreateFacultySaga() {
  yield takeLatest('CREATING_FACULTY', createFacultySaga);
}

export function* updatedFacultySaga() {
  const updateChannel = createEventChannel();
  while (true) {
    const faculty = yield take(updateChannel);
    yield put({ type: 'UPDATING_FACULTIES', faculty });
  }
}
