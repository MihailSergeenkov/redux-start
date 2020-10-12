import React  from 'react';
import { sortableContainer } from 'react-sortable-hoc';

import Chapter from '../Chapter';

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const ChaptersList = ({ chapters, addChapter, sortChapters }) => {
  return (
    <SortableContainer onSortEnd={sortChapters}>
      {
        chapters && chapters.map(
          (chapter, index) => (
            <Chapter
              key={`item-${index}`}
              chapter={chapter}
              chapterIndex={index}
              index={index}
            />
          )
        )
      }
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            addChapter(e.target.title.value);
            e.target.title.value = '';
          }
        }
      >
        <input name='title' />
        <button>Add chapter</button>
      </form>
    </SortableContainer>
  );
};

export default ChaptersList;
