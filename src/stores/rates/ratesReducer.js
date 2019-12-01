import defaultState from "stores/main/defaultState";

export default function ratesReducer(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_RATE":
      return {
        ...state,
        rates: { ...state.rates, [action.data.currency]: action.data.value }
      };
    case "SET_RATES":
      return {
        ...state,
        rates: action.data,
      };
    case "CHANGE_TARGET":
      return {
        ...state,
        targetCurrency: action.data
      };
    default:
      return state;
  }
}
