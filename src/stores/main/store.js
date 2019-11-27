import { createStore, applyMiddleware, compose } from "redux";
import mainReducer from "stores/main/mainReducer";
import createSagaMiddleWare from "redux-saga";
import defaultState from "stores/main/defaultState";
import initSagas from "initSagas";

const getStore = () => {
  const sagaMiddleware = createSagaMiddleWare();
  const middlewares = [sagaMiddleware];
  const composables = [applyMiddleware(...middlewares)];
  const enhancer = compose(...composables);
  const store = createStore(mainReducer, defaultState, enhancer);
  initSagas(sagaMiddleware);
  return store;
};

export default getStore();
