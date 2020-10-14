import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ReplaceSectionModal = ({ sectionIndex, chapterIndex, chapters, replaceSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(chapterIndex);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChapterIndex = (e) => {
    setSelectedChapterIndex(parseInt(e.target.value));
  };

  const handleReplace = () => {
    replaceSection(sectionIndex, chapterIndex, selectedChapterIndex);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleOpen} className='mr-1 border border-grey-800' >Replace</button>
      {
        isOpen && ReactDOM.createPortal(
          <div className='opacity-75 fixed inset-0 z-40 bg-black'>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                    <h3 className='text-3xl font-semibold'>
                      Replace section
                    </h3>
                    <button
                      className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={toggleOpen}
                    >
                      <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                    </span>
                    </button>
                  </div>
                  <div className='relative p-6 flex-auto'>
                    <div className='relative flex w-full flex-wrap items-stretch mb-3'>
                      <span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
                        <select name='chapterIndex' onChange={handleChapterIndex} defaultValue={selectedChapterIndex}>
                          {
                            chapters.map((chapter, index) => (
                              <option value={index} key={index}>
                                {chapter.title}
                              </option>
                            ))
                          }
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
                    <button onClick={handleReplace} className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'>
                      Replace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById('modal-root')
        )
      }
    </>
  );
};

export default ReplaceSectionModal;
