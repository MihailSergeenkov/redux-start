import { connect } from 'react-redux';
import { createSelector } from 'reselect'

import Results from './Results';

const mapStateToProps = (state) => ({
  chaptersSize: state.chapters.present.data.length,
  sectionsSize: getSections(state).length,
  progress: getProgress(state),
});

const getSections = createSelector(
  state => state.chapters,
  chapters => chapters.present.data.flatMap(chapter => chapter.sections)
);

const getProgress = (state) => {
  const sections = getSections(state);
  const completedSections = sections.filter(section => section.completed === true);

  return 100 * completedSections.length / sections.length;
};

export default connect(mapStateToProps)(Results);
