import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_RATES} from "stores/rates/ratesActions";
import Toaster from 'toaster/toaster';

export function* ratesSaga() {
  let toaster = new Toaster('ratesToaster');
  let response = null;
  let data =null;
  console.log("Starting fetching data...");
    yield toaster.inProgress('Fetching rates...');
    try{
        response = yield call(fetch, process.env.REACT_APP_RATES_API);  
        data = yield apply(response, response.json);
        yield toaster.updateSuccess('Newest rates fetched succesfully');
    }catch(err){
        response = {rates:{ CAD: 1.4608, HKD: 8.6361, PLN: 4.5 }};
        data = response;
        toaster.updateError('Unable to fetch rates. ');
    }finally{
      yield put({ type: SET_RATES, data: data.rates });
    }

    
    
    
}
