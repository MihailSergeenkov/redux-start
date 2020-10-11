import { connect } from 'react-redux';

import { addChapter } from '../../redux/actions/chapters';
import ChaptersList from './ChaptersList';

const mapStateToProps = (state) => ({
  chapters: state.chapters,
});

const mapDispatchToProps = (dispatch) => ({
  addChapter: (title) => dispatch(addChapter(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
