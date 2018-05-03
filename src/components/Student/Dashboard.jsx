import React from 'react';

import * as routes from '../../constants/routes';
import { userIsAuthenticated } from '../../helpers/authHelpers';

import Courses from '../../containers/Student/Courses';
import Dashboard from '../Dashboard/Dashboard';

const items = {
  [routes.COURSES]: userIsAuthenticated(Courses),
  [routes.EXAMS]: userIsAuthenticated(Courses),
};

const StudentDashboard = props => (
  <Dashboard items={items} {...props} />
);

export default StudentDashboard;
