import React from 'react';

import FilterButton from '../FilterButton';

const Filters = ({ setFilter }) => {
  return (
    <div>
      <FilterButton
        name='Show all'
        handleClick={() => { setFilter('SHOW_ALL') }} 
      />
      <FilterButton
        name='Show completed'
        handleClick={() => { setFilter('SHOW_COMPLETED') }}
      />
      <FilterButton
        name='Show uncompleted'
        handleClick={() => { setFilter('SHOW_UNCOMPLETED') }}
      />
    </div>
  );
};

export default Filters;
