import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { PostPage } from './pages/PostPage/PostPage';
import { ViewPostPage } from './pages/ViewPostPage/ViewPostPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/posts/create" exact>
          <PostPage />
        </Route>
        <Route path="/posts/:id" exact>
          <ViewPostPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
