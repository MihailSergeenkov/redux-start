import React from 'react';

const UndoButton = ({ undo }) => {
  return (
    <button 
      onClick={undo}
      className='mr-3 border border-grey-800 px-3 py-1'
    >
      Undo
    </button>
  );
};

export default UndoButton;
