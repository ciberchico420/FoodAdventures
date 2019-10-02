import { createStore, combineReducers, applyMiddleware } from 'redux';
import currentUser from './reducers/currentUser';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';

const reducer = combineReducers({
    currentUser
});

const middleware = applyMiddleware(ReduxThunk,promise,logger)
const store = createStore(reducer,middleware);

export default store;