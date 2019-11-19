import moment from "moment";

let defaultState = {
  base: "EUR",
  targetCurrency: "PLN",
  rates: { CAD: 1.4608, HKD: 8.6361, PLN: 4.5 },
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
export default defaultState;
