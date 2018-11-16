import React, { Component } from 'react';
import Base from 'terra-base';
import Field from 'terra-form-field';
import Input from 'terra-form-input';
import PopupContainer from './Popup/PopupContainer';
import createSagaMiddleware from 'redux-saga'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import Application from 'terra-clinical-application'
import { Provider } from 'react-redux'
import './App.css';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(Object.assign({},
  null,
));

/** @const redux store */
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));

[].map(saga => (sagaMiddleware.run(saga)));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Application >
          <PopupContainer />
        </Application>
      </Provider>
    )
  }
}

export default App;
