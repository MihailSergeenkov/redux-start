import arrayMove from 'array-move';

import * as chapterActions from '../actionTypes/chapters';
import * as sectionActions from '../actionTypes/sections';

const initialState = [{ 
  title: '1 chapter', 
  completed: false,
  sections: [
    {
      title: '1 section',
      completed: false,
    },
  ],
}];

export const chapters = (state = initialState, action) => {
  switch (action.type) {
    case chapterActions.SORT_CHAPTERS:
      return arrayMove(state, action.oldIndex, action.newIndex);
    case chapterActions.ADD_CHAPTER:
      return state.concat({
        title: action.title,
        completed: false,
        sections: [],
      });
    case sectionActions.TOGGLE_SECTION:
      return state.map(
        (chapter, index) => {
          if (index === action.chapterIndex) {
            const sections = chapter.sections.map(
              (section, index) => (
                index === action.sectionIndex
                  ? { ...section, completed: !section.completed }
                  : section
              )
            );

            const completed = sections.every((section) => section.completed === true);

            return { ...chapter, sections, completed }
          } else {
            return chapter;
          }
        }
      );
    case sectionActions.ADD_SECTION:
      return state.map(
        (chapter, index) => (
          index === action.chapterIndex
            ? {
                ...chapter,
                sections: chapter.sections.concat({
                  title: action.title,
                  completed: false,
                })
              }
            : chapter
        )
      );
    case sectionActions.SORT_SECTIONS:
      return state.map(
        (chapter, index) => {
          if (index === action.collection) {
            const sections = arrayMove(chapter.sections, action.oldIndex, action.newIndex);

            return { ...chapter, sections }
          } else {
            return chapter;
          }
        }
      );
    case sectionActions.REPLACE_SECTION:
      let section;
      let chapters = state.map(
        (chapter, index) => {
          if (index === action.chapterIndex) {
            let sections = chapter.sections;
            section = sections[action.sectionIndex];
            delete sections[action.sectionIndex]
            sections = sections.filter((section) => section !== undefined);

            return { ...chapter, sections };
          } else {
            return chapter;
          }
        }
      );

      return chapters.map(
        (chapter, index) => {
          if (index === action.newChapterIndex) {
            return {
              ...chapter,
              sections: chapter.sections.concat({
                title: section.title,
                completed: section.completed,
              })
            };
          } else {
            return chapter;
          }
        }
      );
    default:
      return state;
  }
};
