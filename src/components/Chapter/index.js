import { connect } from 'react-redux';

import { addSection, sortSections } from '../../redux/slices/chapters';
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
});

const mapDispatchToProps = (dispatch) => ({
  addSection: (title, chapterIndex) => (
    dispatch(addSection({
      title,
      chapterIndex,
    }))
  ),
  sortSections: ({ oldIndex, newIndex, collection }) => (
    dispatch(sortSections({
      oldIndex,
      newIndex,
      collection,
    }))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(sortableElement(Chapter));
