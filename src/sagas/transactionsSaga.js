import { put, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {SET_TRANSACTIONS} from "stores/transactions/transactionsActions";
import Toaster from 'toaster/toaster';

let mockedTransactions = [
  {
    _id:'1',
    timestamp: '1995-12-31T23:00:00.000Z',
    amount: 100.0,
    base: "EUR",
    title: "My birthday gift!",
    person: "Freddie Mercury"
  },
  {
    _id:'2',
    timestamp: '2013-12-31T23:00:00.000Z',
    amount: -45.0,
    base: "EUR",
    title: "Beers with friends",
    person: "Linus Torvalds"
  }
];

export function* transactionsSaga() {
  let myWalletAPI = getApiUrl();
  let toaster = new Toaster('TransactionToaster');
  let response = null;
  let data = null;
  console.log("Starting fetching transactions...");

  yield toaster.inProgress('Fetching transactions...')
  try {
    response = yield call(fetch, `${myWalletAPI}/transactions`);
    data = yield apply(response, response.json);
    yield toaster.updateSuccess('Transaction fetched')
  }
  catch(err){
    data = mockedTransactions;
    yield toaster.updateError(`Unable to fetch transactions. Mocked some for you. Error:${err}`)
  }
  finally{
    yield put({ type: SET_TRANSACTIONS, data: data });
    console.log("State changed with newest transactions");
  }
}
function getApiUrl(){
  console.log('ENV:',process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development'){
    console.log('In dev env');
    return process.env.REACT_APP_MY_WALLET_API_DEV;
  }
  else{
    console.log('Non dev env');  
    return process.env.REACT_APP_MY_WALLET_API_PROD;
  }
}