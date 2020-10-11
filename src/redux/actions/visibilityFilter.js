import * as filterActions from '../actionTypes/visibilityFilter';

export const setFilter = (filter) => ({
  type: filterActions.SET_FILTER,
  filter,
});
