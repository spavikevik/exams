import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

class DashboardMenu extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  }

  constructor(props) {
    super(props);
    this.onItemClick.bind(this);
  }

  state = { activeItem: 'home' };

  onItemClick(path) {
    return (e, { name }) => {
      this.setState({ activeItem: name });
      this.props.history.push(path);
    };
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu
        fixed
        vertical
        pointing
        secondary
      >
        <Menu.Item name="profile" active={activeItem === 'profile'} onClick={this.onItemClick(routes.STUDENT_PROFILE)} />
        <Menu.Item name="courses" active={activeItem === 'courses'} onClick={this.onItemClick(routes.STUDENT_COURSES)} />
        <Menu.Item name="exams" active={activeItem === 'exams'} onClick={this.onItemClick(routes.STUDENT_EXAMS)} />
      </Menu>
    );
  }
}

export default withRouter(DashboardMenu);
