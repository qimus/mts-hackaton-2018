import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import rootReducer from '../reducers'

const ENV = process.env.NODE_ENV || 'production';

const logger = store => next => action => {
    console.log(action);
    return next(action);
};

let middlewares = [ thunk, apiMiddleware ];

if (ENV !== 'production' && 0) {
    middlewares.push(logger);
}

const composeEnhancers =
    typeof window === 'object' && ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
        initialState
    );

    return store;
}