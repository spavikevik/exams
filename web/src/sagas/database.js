import { race, take, takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { tablesRefs, createItem, updateItem } from '../firebase/db';
import { createDatabaseChannels } from '../helpers/sagaHelpers';

const tablesAndActions = Object.entries(tablesRefs).map(([table, ref]) => [ref, `UPDATING_${table.toUpperCase()}`]);

function* createItemSaga(action) {
  const { item, table } = action.payload;
  try {
    yield call(createItem, table, item);
  } catch (e) {
    // do nothing
  }
}

function* updateItemSaga(action) {
  const { id, table, fields } = action.payload;
  try {
    yield call(updateItem, table, id, fields);
  } catch (e) {
    // do nothing
  }
}

export function* watchItemSaga() {
  yield all([
    takeLatest('CREATING_ITEM', createItemSaga),
    takeLatest('UPDATING_ITEM', updateItemSaga),
  ]);
}

export function* updatedItemSaga() {
  yield all(tablesAndActions.map(([ref, actionType]) => {
    const saga = function* () { // eslint-disable-line 
      const { createChannel, updateChannel } = createDatabaseChannels(ref);
      while (true) {
        const { create, update } = yield race({
          create: take(createChannel),
          update: take(updateChannel),
        });
        const { key, item } = create || update;
        yield put({ type: actionType, key, item });
      }
    };
    return fork(saga);
  }));
}
