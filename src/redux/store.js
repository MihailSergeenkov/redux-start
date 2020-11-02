import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import thunkMiddleware from 'redux-thunk';

import chapters from './slices/chapters';
import visibilityFilter from './slices/visibilityFilter';

const reducers = combineReducers({
  chapters: undoable(chapters),
  visibilityFilter,
});

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
