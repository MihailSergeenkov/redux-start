import React from 'react';

import Filters from '../../Filters';
import ChaptersList from '../../ChaptersList';
import Results from '../../Results';
import UndoButton from '../../UndoButton';

const MainPage = () => {
  return (
    <div className="flex flex-col h-full items-center bg-gray-200 text-gray-700">
      <h1 className="text-4xl font-thin tracking-wider">Interesting book</h1>
      <Filters />
      <ChaptersList />
      <Results />
      <UndoButton />
    </div>
  );
};

export default MainPage;
