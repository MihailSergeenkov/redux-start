import * as chapterActions from '../actionTypes/chapters';

export const addChapter = (title) => ({
  type: chapterActions.ADD_CHAPTER,
  title,
});
