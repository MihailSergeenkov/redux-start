import { connect } from 'react-redux';
import { sortableElement } from 'react-sortable-hoc';

import { toggleSection } from '../../redux/slices/chapters';
import Section from './Section';

const mapDispatchToProps = (dispatch) => ({
  toggleSection: (sectionIndex, chapterIndex) => (
    dispatch(toggleSection({
      sectionIndex,
      chapterIndex,
    }))
  ),
});

export default connect(null, mapDispatchToProps)(sortableElement(Section));
