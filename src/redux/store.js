import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from '@redux-saga/core';
