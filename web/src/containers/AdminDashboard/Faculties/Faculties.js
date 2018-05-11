import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createFaculty } from '../../../actions/faculty';
import Faculties from '../../../components/AdminDashboard/Faculties/Faculties';

const mapStateToProps = state => ({
  faculties: state.facultyState.faculties,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createFaculty,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Faculties);
