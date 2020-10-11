import React from 'react';

const FilterButton = ({ name, handleClick }) => {
  return (
    <button 
      onClick={handleClick}
      className='mr-3 border border-grey-800 px-3 py-1'
    >
      {name}
    </button>
  );
};

export default FilterButton;
