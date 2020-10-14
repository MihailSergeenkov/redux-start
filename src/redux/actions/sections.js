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

export const sortSections = (oldIndex, newIndex, collection) => ({
  type: sectionActions.SORT_SECTIONS,
  oldIndex,
  newIndex,
  collection,
});

export const replaceSection = (sectionIndex, chapterIndex, newChapterIndex) => ({
  type: sectionActions.REPLACE_SECTION,
  sectionIndex,
  chapterIndex,
  newChapterIndex,
});
