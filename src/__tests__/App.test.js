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

const promise = Promise.resolve(chapters);

httpClient.get.mockImplementationOnce(() => promise);

describe('Routing', () => {
  describe('Main page', () => {
    it('renders page', async () => {
      render(<App />);

      const headerEl = screen.getByText('Interesting book');

      expect(headerEl).toBeTruthy();

      const loaderEl = screen.getByText('Loading...');

      expect(loaderEl).toBeTruthy();

      

      await act(() => promise);
      // await act(async () => {
      //   () => promise;
      //   rerender(<App />);
      //   await ;
      // });

      // expect(httpClient.get).toHaveBeenCalledTimes(1);
      // expect(httpClient.get).toHaveBeenCalledWith('/chapters');

      // expect(await screen.findByText('1 chapter')).toBeInTheDocument();
      // screen.debug();


      // await waitFor(async () => expect(await screen.findByText('1 chapter')).toBeInTheDocument());
      
      // expect(screen.getByText('1 chapter')).toBeInTheDocument();

      const chapterEl = screen.getByText('1 chapter');

      expect(chapterEl).toBeTruthy();
    });
  });
  
  describe('Chapter page', () => {
    it('renders page', () => {
      render(<App />);
      const chapterBtn = screen.getByText('View');

      userEvent.click(chapterBtn);

      const headerEl = screen.getByText('Chapter');

      expect(headerEl).toBeTruthy();
    });

    it('has correct path', () => {
      const history = createMemoryHistory();
      render(<App history={history} />);
      const chapterBtn = screen.getByText('View');

      userEvent.click(chapterBtn);

      const { location: { pathname } } = history;

      expect(pathname).toBe('/chapters/qwer1');
    });
  });
  
});
