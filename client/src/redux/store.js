import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';

const logger = createLogger();
export const store = createStore(
    rootReducer, compose(
     applyMiddleware(thunk, logger),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ));

