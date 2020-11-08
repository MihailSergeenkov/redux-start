import { connect } from 'react-redux';

import ChapterPage from './ChapterPage';

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.chapters.present.isLoading,
  chapter: state.chapters.present.data.find((chapter) => (
    chapter._id === ownProps.match.params.id
  )),
});

export default connect(mapStateToProps)(ChapterPage);
