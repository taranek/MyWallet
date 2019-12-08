import React from "react";
import renderer from "react-test-renderer";
import TransactionForm, { mapStateToProps } from "./TransactionForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import moment from "moment";

describe("TransactionForm component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
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
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly", () => {
    let tree = null;
    const appState = {
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
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <TransactionForm></TransactionForm>
        </Provider>
      );
    });
    it("Should contain amount input", () => {
      let component = tree.root;
      let elements = component.findAllByProps({
        id: "transaction-form-amount"
      });
      expect(elements.length).toBeGreaterThan(0);
    });
    it("Should contain title input", () => {
      let component = tree.root;
      let elements = component.findAllByProps({ id: "transaction-form-title" });
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
