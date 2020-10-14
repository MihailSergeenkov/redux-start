import React from 'react';

import ReplaceSectionModal from '../ReplaceSectionModal';

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
      <ReplaceSectionModal
        sectionIndex={sectionIndex}
        chapterIndex={chapterIndex}
      />
    </label>
  );
};

export default Section;
