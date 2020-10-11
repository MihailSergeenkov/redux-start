import * as filterActions from '../actionTypes/visibilityFilter';

const initialState = 'SHOW_ALL';

export const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case filterActions.SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};
