import React from 'react';
import './App.css';
import Page from './components/Page';
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <div className="App">
                    <Page />
                </div>
            </Provider>
        );
    }
}

export default App;
