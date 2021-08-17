import React from "react";
import { PostPage } from "./pages/PostPage/PostPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import { HomePage } from "./pages/HomePage/HomePage";

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
      </Switch>
    </Router>
  );
};

export default App;
