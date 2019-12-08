import { createStore, applyMiddleware, compose } from "redux";
import transactionsReducer from "stores/transactions/transactionsReducer";
import ratesReducer from "stores/rates/ratesReducer";
import createSagaMiddleWare from "redux-saga";
import initSagas from "initSagas";
import defaultState from "./defaultState";
import reduceReducers from "reduce-reducers";

function getStore() {
  const sagaMiddleware = createSagaMiddleWare();
  const middlewares = [sagaMiddleware];
  const composables = [applyMiddleware(...middlewares)];
  const enhancer = compose(...composables);
  const reduced = reduceReducers(transactionsReducer, ratesReducer);
  const store = createStore(reduced, defaultState, enhancer);
  initSagas(sagaMiddleware);
  return store;
}

export default getStore();
