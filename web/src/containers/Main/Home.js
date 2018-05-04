import { connect } from 'react-redux';

import Home from '../../components/Main/Home';

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
