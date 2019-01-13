import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import Application from 'terra-clinical-application';
import { Provider } from 'react-redux';
import './App.css';
import AddRepoReducers from './AddRepo/reducers';
import AppReducers from './reducers';
import PopupSagas from './AddRepo/sagas';
import Container from './AppContainer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(Object.assign({}, AddRepoReducers, AppReducers));

/** @const redux store */
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));

[...PopupSagas].map(saga => (sagaMiddleware.run(saga)));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application>
          <Container />
        </Application>
      </Provider>
    );
  }
}

export default App;
