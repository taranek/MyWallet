import { createStore } from "redux";
import moment from "moment";
let defaultState = {
  base: "EUR",
  targetCurrency: "PLN",
  rates: [
    {
      to: "PLN",
      rate: 2.22
    },
    {
      to: "GBP",
      rate: 0.96
    },
    {
      to: "CHF",
      rate: 1.56
    }
  ],
  transactions: [
    {
      timestamp: moment([1996]),
      amount: 100.0,
      base: "EUR",
      title: "My birthday gift!",
      person: "Freddie Mercury"
    },
    {
      timestamp: moment([2014]),
      amount: -45.0,
      base: "EUR",
      title: "Beers with friends",
      person: "Linus Torvalds"
    }
  ]
};
function amount(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_RATE":
      return {
        ...state,
        rates: state.rates.map((rate, i) =>
          rate.to === action.data.currency
            ? { ...rate, rate: action.data.value }
            : rate
        )
      };
    case "CHANGE_TARGET":
      return {
        ...state,
        targetCurrency: action.data
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.concat(action.data)
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: arrayRemove(state.transactions, action.data)
      };
    default:
      return state;
  }
}
function arrayRemove(arr, timestampToRemove) {
  return arr.filter(el => el !== timestampToRemove);
}

let store = createStore(amount);
export default store;
