import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Navigation from '../../components/Main/Navigation';

const mapStateToProps = state => ({
  session: state.sessionState,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Navigation);
