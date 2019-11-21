import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_RATES} from "stores/main/actions";

export function* ratesSaga() {
  console.log("Starting fetching data...");
  const response = yield call(fetch, "https://api.exchangeratesapi.io/latest");

  console.log("Loading takes looooooong time...");
  yield delay(1000);
  
  const data = yield apply(response, response.json);
  
  yield put({ type: SET_RATES, data: data.rates });
  console.log("State changed with newest rates");
}
