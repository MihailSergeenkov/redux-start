import React from 'react';

const Section = ({ section, sectionIndex, chapterIndex, toggleSection }) => {
  return (
    <label className='block select-none'>
      <input
        type='checkbox'
        onChange={() => toggleSection(sectionIndex, chapterIndex)}
        checked={section.completed}
      />
      {' '}
      {section.title}
    </label>
  );
};

export default Section;
