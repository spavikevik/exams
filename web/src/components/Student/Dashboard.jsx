import React from 'react';

import * as routes from '../../constants/routes';
import { userIsAuthenticated } from '../../helpers/authHelpers';

import Courses from '../../containers/Student/Courses';
import Dashboard from '../Dashboard/Dashboard';
import Exams from './Exams';

const items = {
  [routes.COURSES]: userIsAuthenticated(Courses),
  [routes.EXAMS]: userIsAuthenticated(Exams),
};

const StudentDashboard = props => (
  <Dashboard items={items} {...props} />
);

export default StudentDashboard;
