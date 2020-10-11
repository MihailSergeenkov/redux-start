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
    default:
      return state;
  }
};
