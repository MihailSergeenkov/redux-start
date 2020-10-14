import { connect } from 'react-redux';

import { replaceSection } from '../../redux/actions/sections';
import ReplaceSectionModal from './ReplaceSectionModal';

const mapStateToProps = (state) => ({
  chapters: state.chapters,
});

const mapDispatchToProps = (dispatch) => ({
  replaceSection: (sectionIndex, chapterIndex, newChapterIndex) => dispatch(replaceSection(sectionIndex, chapterIndex, newChapterIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplaceSectionModal);
