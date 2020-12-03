import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router, matchPath, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './redux/store';
import { fetchChapter, fetchChapters } from './redux/slices/chapters';

import MainPage from './components/pages/MainPage';
import ChapterPage from './components/pages/ChapterPage';

const browserHistory = createBrowserHistory();

const routes = [
  {
    component: MainPage,
    exact: true,
    strict: true,
    path: '/',
    loadData: () => {
      return store.dispatch(fetchChapters());
    },
  },
  {
    component: ChapterPage,
    exact: true,
    strict: true,
    path: '/chapters/:id',
    loadData: (match) => {
      return store.dispatch(fetchChapter(match.params.id));
    },
  },
];

const onLoad = () => {
  routes.some(route => {
    const match = matchPath(window.location.pathname, route);
    if (match && route.loadData) 
      route.loadData(match);

    return match;
  });
};

browserHistory.listen(() => {
  onLoad();
});

function App(props) {
  useEffect(() => {
    onLoad();
  }, []);

  const history = props.history || browserHistory;

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {
            routes.map((route, index) => (
              <Route key={index} {...route}/>
            ))
          }
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
