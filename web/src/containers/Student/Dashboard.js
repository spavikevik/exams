// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dashboard from '../../components/Student/Dashboard';

const mapStateToProps = state => ({
  student: state.studentState.student,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
