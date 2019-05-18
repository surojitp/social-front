import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './ruducers';

const innitialState = {}

const middleware = [thunk];

const store = createStore(
  rootReducer, 
  innitialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) 
  
  );

export default store;