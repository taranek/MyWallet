import { delay, put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_TRANSACTIONS} from "stores/main/actions";
import Toaster from 'toaster/toaster';

export function* transactionsSaga() {
  let toaster = new Toaster('TransactionToaster');
  toaster.inProgress('Fetching transactions...')
  
  const response = yield call(fetch, `${process.env.REACT_APP_MY_WALLET_API}/transactions`);
  
  const data = yield apply(response, response.json);
  
  yield put({ type: SET_TRANSACTIONS, data: data });
  console.log("State changed with newest transactions");
  toaster.updateSuccess('Transaction fetched')
}
