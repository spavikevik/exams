import React from 'react';

import { auth } from '../firebase';

const Signout = () =>
  <button
    type="button"
    onClick={auth.SignOut}
  >
    Sign Out
  </button>

export default Signout;