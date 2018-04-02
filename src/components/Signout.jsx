import React from 'react';

import { auth } from '../firebase';

const Signout = () =>
  (
    <button
      type="button"
      onClick={auth.signOut}
    >
    Sign Out
    </button>
  );

export default Signout;
