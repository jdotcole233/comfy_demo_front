import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const persistConfig = { // configuration object for redux-persist
    key: 'visal-tokenization-token-for-token-that-tokens',
    storage, // define which storage to use
}

const persistedReducer = persistReducer(persistConfig, reducers) // create a persisted reducer


export const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware()
));

export const persistor = persistStore(store);