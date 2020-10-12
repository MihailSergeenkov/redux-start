import { connect } from 'react-redux';

import { addSection } from '../../redux/actions/sections';
import Chapter from './Chapter';

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (todo) => !!todo.completed,
  SHOW_UNCOMPLETED: (todo) => !todo.completed,
};

const fetchSectionsByChapter = (state) => (
  state.chapters.reduce(
    (result, chapter, index) => {
      result[index] = chapter.sections.filter(filters[state.visibilityFilter]);
      return result;
    },
    {}
  )
);

const mapStateToProps = (state) => ({
  sections: fetchSectionsByChapter(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSection: (title, chapterIndex) => dispatch(addSection(title, chapterIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
