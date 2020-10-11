import React from 'react';

import Chapter from '../Chapter';

const ChaptersList = ({ chapters, addChapter }) => {
  return (
    <div>
      {
        chapters && chapters.map(
          (chapter, index) => (
            <div key={index}>
              <Chapter chapter={chapter} index={index} />
            </div>
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
    </div>
  );
};

export default ChaptersList;
