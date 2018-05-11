import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class DashboardMenu extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);
    this.onItemClick.bind(this);
  }

  state = { activeItem: 'home' };

  onItemClick(path) {
    return (e, { name }) => {
      this.setState({ activeItem: name });
      this.props.history.push(`${this.props.match.path}/${path}`);
    };
  }

  render() {
    const { activeItem } = this.state;
    const { menuItems } = this.props;
    return (
      <Menu
        vertical
        pointing
        secondary
      >
        {
          menuItems.map(path =>
            (<Menu.Item
              key={path}
              name={path}
              active={activeItem === path}
              onClick={this.onItemClick(path)}
            />))
        }
      </Menu>
    );
  }
}

export default withRouter(DashboardMenu);
