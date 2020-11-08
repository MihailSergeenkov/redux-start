import { connect } from 'react-redux';
import arrayMove from 'array-move';

import { updateChapter } from '../../redux/slices/chapters';
import Chapter from './Chapter';
import { sortableElement } from 'react-sortable-hoc';

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (todo) => !!todo.completed,
  SHOW_UNCOMPLETED: (todo) => !todo.completed,
};

const fetchSectionsByChapter = (state) => (
  state.chapters.present.data.reduce(
    (result, chapter) => {
      result[chapter._id] = chapter.sections.filter(filters[state.visibilityFilter]);
      return result;
    },
    {}
  )
);

const mapStateToProps = (state) => ({
  sections: fetchSectionsByChapter(state),
  chapters: state.chapters.present.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateChapter: (data) => (
    dispatch(updateChapter(data))
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  sections: stateProps.sections,
  sortSections: dispatchProps.sortSections,
  addSection: (title, chapterIndex) => {
    const chapter = stateProps.chapters.find((chapter) => (
      chapter._id === chapterIndex
    ));

    dispatchProps.updateChapter({
      chapterIndex,
      chapterCompleted: false,
      sections: chapter.sections.concat({
        title,
        completed: false,
      }),
    });
  },
  sortSections: ({ oldIndex, newIndex, collection }) => {
    const chapter = stateProps.chapters.find((chapter) => (
      chapter._id === collection
    ));

    const sections = arrayMove(chapter.sections, oldIndex, newIndex);

    dispatchProps.updateChapter({
      chapterIndex: chapter._id,
      chapterCompleted: chapter.completed,
      sections,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(sortableElement(Chapter));
