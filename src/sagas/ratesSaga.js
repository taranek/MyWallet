import { put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import { SET_RATES } from "stores/rates/ratesActions";
import Toaster from "toaster/toaster";

let mockedRates = { rates: { CAD: 1.4608, HKD: 8.6361, PLN: 4.5 } };

export function* ratesSaga(useToaster = true) {
  let toaster = new Toaster("ratesToaster");
  let response = null;
  let toastify = false;
  let data = null;
  console.log("Starting fetching rates...");
  if (useToaster) yield toaster.inProgress("Fetching rates...");
  try {
    response = yield call(fetch, process.env.REACT_APP_RATES_API);
    data = yield apply(response, response.json);
    if (useToaster)
      yield toaster.updateSuccess("Newest rates fetched succesfully");
  } catch (err) {
    data = mockedRates;
    if (useToaster)
      yield toaster.updateError(
        `Unable to fetch rates. Mocked some for you. Error:${err}`
      );
  } finally {
    yield put({ type: SET_RATES, data: data.rates });
    console.log("State changed with newest rates");
  }
}
