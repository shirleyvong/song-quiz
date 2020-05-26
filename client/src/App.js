import React from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Search from './components/Search';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // const dispatch = useDispatch();
  // const token = useSelector(state => state.accessToken);
  // const tokenExpiry = useSelector(state => state.accessTokenExpiry);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/game/:id'>Game</Link>
            </li>
            <li>
              <Link to='/search/:id'>Search</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/search/:id'>
            <Search />
          </Route>
          <Route path='/game/:id'>
            <Game />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
