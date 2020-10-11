import { connect } from 'react-redux';

import Results from './Results';

const mapStateToProps = (state) => ({
  chaptersSize: state.chapters.length,
  sectionsSize: getSections(state.chapters).length,
  progress: getProgress(state.chapters),
});

const getSections = (chapters) => chapters.flatMap(chapter => chapter.sections);

const getProgress = (chapters) => {
  const sections = getSections(chapters);
  const completedSections = sections.filter(section => section.completed === true);

  return 100 * completedSections.length / sections.length;
};

export default connect(mapStateToProps)(Results);
