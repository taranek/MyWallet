import { mapStateToProps } from "./TransactionsList";
import moment from "moment";

describe("TransactionsList component tests", () => {
  const appState = {
    base: "EUR",
    targetCurrency: "PLN",
    rates: { CAD: 1.4608, HKD: 8.6361, ISK: 135.9, PLN: 135.9 },
    transactions: [
      {
        timestamp: moment([1996]),
        amount: 100.0,
        base: "EUR",
        title: "My birthday gift!",
        person: "Freddie Mercury"
      }
    ]
  };

  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
});
