import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createExam } from '../actions/exam';
import CreateExam from '../components/CreateExam';

const mapStateToProps = state => ({
  courses: state.courseState.courses,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createExam,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateExam);
