import { eventChannel } from 'redux-saga';

function databaseCreatedEventChannel(dbRef) {
  const listener = eventChannel((emit) => {
    dbRef
      .on(
        'child_added',
        data => emit({ key: data.key, item: data.val() }),
      );
    return () => dbRef.off(listener);
  });
  return listener;
}

function databaseUpdatedEventChannel(dbRef) {
  const listener = eventChannel((emit) => {
    dbRef
      .on(
        'child_changed',
        data => emit({ key: data.key, item: data.val() }),
      );
    return () => dbRef.off(listener);
  });
  return listener;
}

function createDatabaseChannels(dbRef) {
  return {
    createChannel: databaseCreatedEventChannel(dbRef),
    updateChannel: databaseUpdatedEventChannel(dbRef),
  };
}

function authenticationChannel(auth) {
  const listener = eventChannel(emit => auth.onAuthStateChanged((authUser) => {
    emit({ authUser });
  }));
  return listener;
}

export {
  databaseCreatedEventChannel,
  databaseUpdatedEventChannel,
  createDatabaseChannels,
  authenticationChannel,
};
