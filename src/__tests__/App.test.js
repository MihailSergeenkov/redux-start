import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import App from '../App';
import httpClient from '../util/httpClient';

jest.mock('../util/httpClient');

const chapters = {
  data: [
    { 
      _id: 'qwer1', 
      title: '1 chapter', 
      completed: false, 
      sections: [{ title: 'sdf', completed: false }] 
    }
  ]
};

describe('Routing', () => {
  describe('Main page', () => {
    it('renders page', async () => {
      const promise = Promise.resolve(chapters);
      httpClient.get.mockImplementationOnce(() => promise);

      render(<App />);

      const headerEl = screen.getByText('Interesting book');

      expect(headerEl).toBeTruthy();

      const loaderEl = screen.getByText('Loading...');

      expect(loaderEl).toBeTruthy();

      await act(() => promise);

      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith('/chapters');

      const chapterEl = screen.getByText('1 chapter');

      expect(chapterEl).toBeTruthy();
    });
  });
  
  describe('Chapter page', () => {
    const chapter = {
      data: {
        _id: 'qwer1',
        title: '1 chapter',
        completed: false,
        sections: [{ title: 'sdf', completed: false }]
      }
    };

    it('renders page', async () => {
      const chaptersPromise = Promise.resolve(chapters);
      httpClient.get.mockImplementationOnce(() => chaptersPromise);
      const chapterPromise = Promise.resolve(chapter);
      httpClient.get.mockImplementationOnce(() => chapterPromise);

      render(<App />);

      await act(() => chaptersPromise);
      
      const chapterBtn = screen.getByText('View');

      userEvent.click(chapterBtn);
      
      await act(() => chapterPromise);

      const headerEl = screen.getByText('Chapter');

      expect(headerEl).toBeTruthy();
    });

    it('has correct path', async () => {
      const history = createMemoryHistory();
      // Не понимаю почему тут сразу срабатывает редьюсер fetchChapter(), а не fetchChapters()
      // как будто тесты не изолированны друг от друга
      // const chaptersPromise = Promise.resolve(chapters);
      // httpClient.get.mockImplementationOnce(() => chaptersPromise);
      const chapterPromise = Promise.resolve(chapter);
      httpClient.get.mockImplementationOnce(() => chapterPromise);

      render(<App history={history} />);

      await act(() => chapterPromise);

      const chapterBtn = screen.getByText('View');
      userEvent.click(chapterBtn);
      const { location: { pathname } } = history;

      expect(pathname).toBe('/chapters/qwer1');
    });
  });
  
});
