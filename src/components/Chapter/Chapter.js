import React from 'react';
import { sortableHandle, sortableContainer } from 'react-sortable-hoc';

import Section from '../Section';

const DragHandle = sortableHandle(() => <span>::</span>);

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const Chapter = ({ chapter, chapterIndex, sections, addSection, sortSections }) => {
  return (
    <div>
      <label className='block select-none'>
        <DragHandle />
        {chapter.title}
        {' '}
        <input
          type='checkbox'
          checked={chapter.completed}
          readOnly
        />
      </label>
      <SortableContainer onSortEnd={sortSections} >
        {
          sections && sections[chapterIndex].map(
            (section, sectionIndex) => (
              <div key={sectionIndex}>
                <Section
                  index={sectionIndex}
                  collection={chapterIndex}
                  section={section}
                  sectionIndex={sectionIndex}
                  chapterIndex={chapterIndex}
                />
              </div>
            )
          )
        }
      </SortableContainer>
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            addSection(e.target.title.value, chapterIndex);
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
