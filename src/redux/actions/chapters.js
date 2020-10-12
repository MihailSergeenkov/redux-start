import * as chapterActions from '../actionTypes/chapters';

export const addChapter = (title) => ({
  type: chapterActions.ADD_CHAPTER,
  title,
});

export const sortChapters = (oldIndex, newIndex) => ({
  type: chapterActions.SORT_CHAPTERS,
  oldIndex,
  newIndex,
});
