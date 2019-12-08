import mainSaga from "./sagas/index";
import ratesWatchSaga from "./sagas/ratesWatchSaga";
const initSagas = sagaMiddleware => {
  let sagas = [mainSaga, ratesWatchSaga];
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
export default initSagas;
