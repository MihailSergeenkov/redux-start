import { connect } from 'react-redux';

import { toggleSection } from '../../redux/actions/sections';
import Section from './Section';

const mapDispatchToProps = (dispatch) => ({
  toggleSection: (sectionIndex, chapterIndex) => dispatch(toggleSection(sectionIndex, chapterIndex)),
});

export default connect(null, mapDispatchToProps)(Section);
