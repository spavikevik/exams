import { connect } from 'react-redux';
import Students from '../../../components/AdminDashboard/Students/Students';

const mapStateToProps = state => ({
  students: state.studentState.students,
});

const mapDispatchToProps = dispatch => ({
  onFetchStudents: students => dispatch({ type: 'LOADING_STUDENTS', students }),
  createStudent: student => dispatch({ type: 'CREATING_STUDENT', payload: { student } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
