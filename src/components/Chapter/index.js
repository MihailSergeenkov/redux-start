import { connect } from 'react-redux';

import { addSection } from '../../redux/actions/sections';
import Chapter from './Chapter';

const mapStateToProps = (state) => ({
  visibilityFilter: state.visibilityFilter,
});

const mapDispatchToProps = (dispatch) => ({
  addSection: (title, chapterIndex) => dispatch(addSection(title, chapterIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
