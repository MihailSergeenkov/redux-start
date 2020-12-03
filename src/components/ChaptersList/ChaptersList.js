import React  from 'react';
import { sortableContainer } from 'react-sortable-hoc';

import Chapter from '../Chapter';

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const ChaptersList = ({ isLoading, chapters, addChapter, sortChapters }) => {
  if (isLoading)
    return <div>Loading...</div>;

  return (
    <SortableContainer onSortEnd={sortChapters} useDragHandle>
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
        <input name='title' className='chapter-name' />
        <button>Add chapter</button>
      </form>
    </SortableContainer>
  );
};

export default ChaptersList;
