import React from 'react';

const Results = ({ chaptersSize, sectionsSize, progress }) => {
  return (
    <div>
      Chapters - {chaptersSize}
      Sections - {sectionsSize}
      Progress - {progress}
    </div>
  );
};

export default Results;
