import { connect } from 'react-redux';

import { replaceSection } from '../../redux/slices/chapters';
import ReplaceSectionModal from './ReplaceSectionModal';

const mapStateToProps = (state) => ({
  chapters: state.chapters.present.data,
});

const mapDispatchToProps = (dispatch) => ({
  replaceSection: (sectionIndex, chapterIndex, newChapterIndex) => (
    dispatch(replaceSection({
      sectionIndex,
      chapterIndex,
      newChapterIndex,
    }))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplaceSectionModal);
