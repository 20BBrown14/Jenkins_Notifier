import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import Application from 'terra-clinical-application';
import { Provider } from 'react-redux';
import './App.css';
import Popup from './Popup/PopupContainer';


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(Object.assign({}, null));

/** @const redux store */
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));

[].map(saga => (sagaMiddleware.run(saga)));

/* eslint-disable-next-line react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Application>
          <Popup />
        </Application>
      </Provider>
    );
  }
}

export default App;
