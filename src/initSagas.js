import mainSaga from "./sagas/index";

const initSagas = sagaMiddleware => {
  let sagas = [];
  sagas.push(mainSaga);
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
export default initSagas;
