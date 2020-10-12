import { connect } from 'react-redux';

import { addChapter, sortChapters } from '../../redux/actions/chapters';
import ChaptersList from './ChaptersList';

const mapStateToProps = (state) => ({
  chapters: state.chapters,
});

const mapDispatchToProps = (dispatch) => ({
  addChapter: (title) => dispatch(addChapter(title)),
  sortChapters: ({ oldIndex, newIndex }) => dispatch(sortChapters(oldIndex, newIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
