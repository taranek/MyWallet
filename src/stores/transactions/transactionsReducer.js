import defaultState from "stores/main/defaultState";

export default function transactionsReducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      console.log('Data from reducer:',action.data);
      console.log(state);
      return {
        ...state,
        transactions: action.data,
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.concat(action.data)
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: removeElement(state.transactions, action.data)
      };
    default:
      return state;
  }
}

function removeElement(arr, timestampToRemove) {
  return arr.filter(el => el !== timestampToRemove);
}
