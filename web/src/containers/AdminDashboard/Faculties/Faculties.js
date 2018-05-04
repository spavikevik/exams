import { connect } from 'react-redux';
import Faculties from '../../../components/AdminDashboard/Faculties/Faculties';

const mapStateToProps = state => ({
  faculties: state.facultyState.faculties,
});

const mapDispatchToProps = dispatch => ({
  onFetchFaculties: faculties => dispatch({ type: 'LOADING_FACULTIES', faculties }),
  createFaculty: faculty => dispatch({ type: 'CREATING_FACULTY', payload: { faculty } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faculties);
