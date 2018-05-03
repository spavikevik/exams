import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { userIsAuthenticated } from '../../helpers/authHelpers';

import DashboardMenu from './DashboardMenu';
import Courses from '../../containers/Student/Courses';

const StudentDashboard = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={3}>
        <DashboardMenu />
      </Grid.Column>
      <Grid.Column width={11}>
        <Route exact path={`${props.match.path}/${routes.COURSES}`} component={userIsAuthenticated(Courses)} />
        <Route exact path={`${props.match.path}/${routes.EXAMS}`} component={userIsAuthenticated(Courses)} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

StudentDashboard.propTypes = {
  match: ReactRouterPropTypes.match.isRequired, // eslint-disable-line
};

export default StudentDashboard;
