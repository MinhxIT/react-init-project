import { applyMiddleware, createStore, Store } from 'redux';
import sagaMiddlewareFactory from 'redux-saga';
import { state } from './reducers';
import sagas from './sagas';

const sagaMiddleware = sagaMiddlewareFactory();
const store: Store = createStore(state, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

export default store;
