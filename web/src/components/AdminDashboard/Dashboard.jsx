import React from 'react';

import * as routes from '../../constants/routes';

import Courses from '../../containers/AdminDashboard/Courses/Courses';
import Faculties from '../../containers/AdminDashboard/Faculties/Faculties';
import Exams from '../../containers/AdminDashboard/Exams/Exams';
import Dashboard from '../Dashboard/Dashboard';

import { userIsAdmin } from '../../helpers/authHelpers';

const items = {
  [routes.FACULTIES]: userIsAdmin(Faculties),
  [routes.COURSES]: userIsAdmin(Courses),
  [routes.EXAMS]: userIsAdmin(Exams),
};

const AdminDashboard = props => (
  <Dashboard items={items} {...props} />
);

export default AdminDashboard;
