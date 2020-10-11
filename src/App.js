import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Filters from './components/Filters';
import ChaptersList from './components/ChaptersList';
import Results from './components/Results';

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-full items-center bg-gray-200 text-gray-700">
        <h1 className="text-4xl font-thin tracking-wider">Interesting book</h1>
        <Filters />
        <ChaptersList />
        <Results />
      </div>
    </Provider>
  );
}

export default App;
