import React from 'react';
import { render } from '../../../../util/testUtils';

import ChapterPage from '../../ChapterPage';

const match = {
  params: {
    id: 'qwer1'
  }
};

describe('when data is loading', () => {
  it('renders is loading page', () => {
    const chapters = {
      chapters: {
        present: {
          isLoading: true,
          data: []
        }
      }
    };
  
    const result = render(<ChapterPage match={match} />, chapters);
    const loaderEl = result.getByText('Loading...');

    expect(loaderEl).toBeTruthy();
  });
});

describe('when data already loaded', () => {
  it('renders data', () => {
    const chapters = {
      chapters: {
        present: {
          isLoading: false,
          data: [
            {
              _id: 'qwer1',
              title: '1 chapter',
              completed: false,
              sections: [{ title: 'sdf', completed: false }]
            }
          ]
        }
      }
    };
  
    const result = render(<ChapterPage match={match} />, chapters);
    const pageTitleEl = result.getByText('Chapter');
    const chapterTitleEl = result.getByText('1 chapter');

    expect(pageTitleEl).toBeTruthy();
    expect(chapterTitleEl).toBeTruthy();
  });
});

