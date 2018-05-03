import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { userIsAdmin } from '../../helpers/authHelpers';

import DashboardMenu from './DashboardMenu';
import Courses from '../../containers/AdminDashboard/Courses/Courses';
import Faculties from '../../containers/AdminDashboard/Faculties/Faculties';
import Exams from '../../containers/AdminDashboard/Exams/Exams';

const AdminDashboard = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={3}>
        <DashboardMenu />
      </Grid.Column>
      <Grid.Column width={11}>
        <Route exact path={`${props.match.path}/${routes.FACULTIES}`} component={userIsAdmin(Courses)} />
        <Route exact path={`${props.match.path}/${routes.COURSES}`} component={userIsAdmin(Faculties)} />
        <Route exact path={`${props.match.path}/${routes.EXAMS}`} component={userIsAdmin(Exams)} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

AdminDashboard.propTypes = {
  match: ReactRouterPropTypes.match.isRequired, // eslint-disable-line
};

export default AdminDashboard;
