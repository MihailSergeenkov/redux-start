import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const render = (ui, initialState) => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper })
}

export * from '@testing-library/react'

export { render }
