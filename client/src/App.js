import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SearchResultsPage from './components/SearchResultsPage';
import GamePage from './components/GamePage';
import SearchPage from './components/SearchPage';
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/search/:query">
        <SearchResultsPage />
      </Route>
      <Route path="/game/:id">
        <GamePage />
      </Route>
      <Route path="/">
        <SearchPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
