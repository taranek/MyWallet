import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_RATES} from "stores/rates/ratesActions";
import Toaster from 'toaster/toaster';
import {ratesSaga} from './ratesSaga';
let mockedRates = {rates:{ CAD: 1.4608, HKD: 8.6361, PLN: 4.5 }};

export default function* ratesWatchSaga() {
    let useToaster = false;
    while(true){
        console.log('Fetching newest rates...');
        yield* ratesSaga(useToaster);
        yield delay(15*1000);
    }
}
