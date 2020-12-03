import React from 'react';

const ChapterPage = ({ isLoading, chapter }) => {
  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <p>Chapter</p>
      <label className='block select-none'>
        {chapter.title}
        {' '}
        <input
          type='checkbox'
          checked={chapter.completed}
          readOnly
        />
      </label>
      {
        chapter.sections && chapter.sections.map(
          (section, sectionIndex) => (
            <div key={sectionIndex}>
              <input
                type='checkbox'
                checked={section.completed}
                readOnly
              />
              {' '}
              {section.title}
            </div>
          )
        )
      }
    </div>
  );
};

export default ChapterPage;
