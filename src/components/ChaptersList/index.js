import { connect } from 'react-redux';

import { addChapter, sortChapters } from '../../redux/slices/chapters';
import ChaptersList from './ChaptersList';

const mapStateToProps = (state) => ({
  isLoading: state.chapters.present.isLoading,
  chapters: state.chapters.present.data,
});

const mapDispatchToProps = (dispatch) => ({
  addChapter: (title) => (
    dispatch(addChapter({
      title,
    }))
  ),
  sortChapters: ({ oldIndex, newIndex }) => (
    dispatch(sortChapters({
      oldIndex,
      newIndex,
    }))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
