import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import UndoButton from './UndoButton';

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(ActionCreators.undo()),
});

export default connect(null, mapDispatchToProps)(UndoButton);
