import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SearchResults from './components/searchResults/SearchResults';
import Game from './components/game/Game';
import Search from './components/select/Select';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <Route path="/search/:query">
          <SearchResults />
        </Route>
        <Route path="/game/:id">
          <Game />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
  </ErrorBoundary>
);

export default App;
