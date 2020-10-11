import * as sectionActions from '../actionTypes/sections';

export const addSection = (title, chapterIndex) => ({
  type: sectionActions.ADD_SECTION,
  title,
  chapterIndex,
});

export const toggleSection = (sectionIndex, chapterIndex) => ({
  type: sectionActions.TOGGLE_SECTION,
  sectionIndex,
  chapterIndex,
});
