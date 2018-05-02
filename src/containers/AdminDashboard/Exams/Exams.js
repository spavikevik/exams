import { connect } from 'react-redux';
import Exams from '../../../components/AdminDashboard/Exams/Exams';

const mapStateToProps = state => ({
  exams: state.examState.exams,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Exams);
