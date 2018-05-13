import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import DashboardMenu from './DashboardMenu';

const Dashboard = (props) => {
  const { items, match } = props;
  const routes = Object.entries(items).map(([path, Component]) =>
    (<Route key={path} exact path={`${match.path}/${path}`} component={() => <Component {...props} />} />));
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <DashboardMenu
            menuItems={Object.keys(items)}
          />
        </Grid.Column>
        <Grid.Column width={11}>
          {routes}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Dashboard.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  items: PropTypes.shape({}).isRequired,
};

export default Dashboard;
