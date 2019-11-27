import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_TRANSACTIONS} from "stores/main/actions";
import Toaster from 'toaster/toaster';

export function* transactionsSaga() {
  let toaster = new Toaster('TransactionToaster');
  console.log("Starting fetching data...");
  toaster.inProgress('Fetching transactions...')
  const response = yield call(fetch, "http://localhost:4000/api/transactions");
  console.log("Loading takes looooooong time...");
  yield delay(1500)
  const data = yield apply(response, response.json);
  console.log('Data from saga:',data);
  yield put({ type: SET_TRANSACTIONS, data: data });
  console.log("State changed with newest transactions");
  toaster.updateSuccess('Transaction fetched')
}
