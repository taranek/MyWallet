import defaultState from "./defaultState";
export default function amount(state = defaultState, action) {
  switch (action.type) {
    case "GET_STATE":
      return state;
    case "CHANGE_RATE":
      return {
        ...state,
        rates: { ...state.rates, [action.data.currency]: action.data.value }
      };
    case "SET_RATES":
      return {
        ...state,
        rates: action.data
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
