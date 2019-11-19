import React from "react";
import renderer from "react-test-renderer";
import moment from "moment";
import AccountSummary, { mapStateToProps } from "./AccountSummary";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("AccountSummary component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        base: "TEST",
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
      base: "TEST",
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
          <AccountSummary></AccountSummary>
        </Provider>
      );
    });
    it("Should contain two elements", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(2);
    });
    it("Should display the highest amount", () => {
      let component = tree.root;
      let label = component.findByProps({ id: "highest-amount" }).props.label;
      expect(label).toContain(100);
    });
    it("Should display the proper currency", () => {
      let component = tree.root;
      let label = component.findByProps({ id: "highest-amount" }).props.label;
      expect(label).toContain("TEST");
    });
    it("Should display the total of all transactions", () => {
      let component = tree.root;
      let label = component.findByProps({ id: "total-amount" }).props.label;
      expect(label).toContain(55);
    });
  });
});
