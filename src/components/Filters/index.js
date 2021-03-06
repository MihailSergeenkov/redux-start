import { connect } from 'react-redux';

import { setFilter } from '../../redux/slices/visibilityFilter';
import Filters from './Filters';

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => (
    dispatch(setFilter({
      filter,
    }))
  ),
});

export default connect(null, mapDispatchToProps)(Filters);
