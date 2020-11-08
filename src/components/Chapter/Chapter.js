import React from 'react';
import { sortableHandle, sortableContainer } from 'react-sortable-hoc';
import { Link } from 'react-router-dom'

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
      <Link to={`/chapters/${chapter._id}`}>View</Link>
      <SortableContainer onSortEnd={sortSections} >
        {
          sections && sections[chapter._id].map(
            (section, sectionIndex) => (
              <div key={sectionIndex}>
                <Section
                  index={sectionIndex}
                  collection={chapter._id}
                  section={section}
                  sectionIndex={sectionIndex}
                  chapterIndex={chapter._id}
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
            addSection(e.target.title.value, chapter._id);
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
