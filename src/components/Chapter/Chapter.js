import React from 'react';

import Section from '../Section';

const Chapter = ({ chapter, index, sections, addSection }) => {
  return (
    <div>
      <label className='block select-none'>
        <input
          type='checkbox'
          checked={chapter.completed}
          readOnly
        />
        {' '}
        {chapter.title}
      </label>
      {
        sections[index].map(
          (section, sectionIndex) => (
            <div key={sectionIndex}>
              <Section
                section={section}
                sectionIndex={sectionIndex}
                chapterIndex={index}
              />
            </div>
          )
        )
      }
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            addSection(e.target.title.value, index);
            e.target.title.value = '';
          }
        }
      >
        <input name='title' />
        <button>Add section</button>
      </form>
    </div>
  );
};

export default Chapter;
