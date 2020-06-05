import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SearchResultsPage from './components/searchResults/SearchResultsPage';
import GamePage from './components/game/GamePage';
import SearchPage from './components/search/SearchPage';
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
