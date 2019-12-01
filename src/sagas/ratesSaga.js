import { put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_RATES} from "stores/rates/ratesActions";
import Toaster from 'toaster/toaster';

let mockedRates = {rates:{ CAD: 1.4608, HKD: 8.6361, PLN: 4.5 }};

export function* ratesSaga() {
  let toaster = new Toaster('ratesToaster');
  let response = null;
  let data =null;
  console.log("Starting fetching rates...");
  yield toaster.inProgress('Fetching rates...');
  try{
    response = yield call(fetch, process.env.REACT_APP_RATES_API);
    data = yield apply(response, response.json);
    yield toaster.updateSuccess('Newest rates fetched succesfully');
  }
  catch(err){
    data = mockedRates;
    yield toaster.updateError(`Unable to fetch rates. Mocked some for you. Error:${err}`);
  }
  finally{
    yield put({ type: SET_RATES, data: data.rates });
    console.log("State changed with newest rates");
  }
}
