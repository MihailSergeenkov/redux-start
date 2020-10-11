import React from 'react';

import Section from '../Section';

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (todo) => !!todo.completed,
  SHOW_UNCOMPLETED: (todo) => !todo.completed,
};

const Chapter = ({ chapter, index, visibilityFilter, addSection }) => {
  const sections = chapter.sections.filter(filters[visibilityFilter]);

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
        sections.map(
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
