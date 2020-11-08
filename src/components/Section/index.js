import { connect } from 'react-redux';
import { sortableElement } from 'react-sortable-hoc';

import { updateChapter } from '../../redux/slices/chapters';
import Section from './Section';

const mapStateToProps = (state) => ({
  chapters: state.chapters.present.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateChapter: (data) => (
    dispatch(updateChapter(data))
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  toggleSection: (sectionIndex, chapterIndex) => {
    const chapter = stateProps.chapters.find((chapter) => (
      chapter._id === chapterIndex
    ));

    const sections = chapter.sections.map(
      (section, index) => (
        index === sectionIndex
          ? { ...section, completed: !section.completed }
          : section
      )
    );

    const chapterCompleted = sections.every((section) => section.completed === true);

    dispatchProps.updateChapter({
      chapterIndex,
      chapterCompleted,
      sections,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(sortableElement(Section));
