import { connect } from 'react-redux';
import Account from '../../components/Account/Account';

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Account);
