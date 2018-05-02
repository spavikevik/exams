import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import DashboardMenu from './DashboardMenu';

const StudentDashboard = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={3}>
        <DashboardMenu />
      </Grid.Column>
      <Grid.Column width={11}>
        {props.children}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

StudentDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentDashboard;
