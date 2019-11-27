import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_RATES} from "stores/main/actions";
import Toaster from 'toaster/toaster';

export function* ratesSaga() {
  let toaster = new Toaster('ratesToaster');
  console.log("Starting fetching data...");
    yield toaster.inProgress('Fetching rates...');
  
  const response = yield call(fetch, process.env.REACT_APP_RATES_API);
  const data = yield apply(response, response.json);
    
    yield put({ type: SET_RATES, data: data.rates });
  console.log("State changed with newest rates");  
    yield toaster.updateSuccess('Newest rates fetched');
}
