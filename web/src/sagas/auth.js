import { take, call, put } from 'redux-saga/effects';
import { firebase } from '../firebase';
import { authenticationChannel } from '../helpers/sagaHelpers';
import { getAuthUserToken } from '../helpers/authHelpers';

function* watchAuth() {
  const authChannel = authenticationChannel(firebase.auth);
  while (true) {
    const { authUser } = yield take(authChannel);
    let claims;
    if (authUser) {
      ({ claims } = yield call(getAuthUserToken, authUser));
    } else {
      claims = { admin: false, accessLevel: 0 };
    }
    yield put({ type: 'SETTING_AUTH_USER', authUser, claims });
  }
}

export { watchAuth }; // eslint-disable-line
