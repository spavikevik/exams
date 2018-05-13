import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleRegisterStudentForExam } from '../../../actions/exam';
import Exams from '../../../components/AdminDashboard/Exams/Exams';

const mapStateToProps = state => ({
  exams: state.examState.exams,
  students: state.studentState.students,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleRegisterStudentForExam,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Exams);
