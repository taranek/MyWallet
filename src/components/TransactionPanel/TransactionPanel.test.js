import React from "react";
import renderer from "react-test-renderer";
import TransactionPanel, { mapStateToProps } from "./TransactionPanel";
import { Provider } from "react-redux";
import { createStore } from "redux";
import moment from 'moment';

describe("TransactionPanel component tests", () => {
    const appState = {
      
      targetCurrency: "PLN",
      rates: { CAD: 1.4608, HKD: 8.6361, PLN: 4.5 },
      };
      const otherProps = {
        transaction: 
        {
          timestamp: moment([1996]),
          amount: 100.0,
          base: "EUR",
          title: "My birthday gift!",
          person: "Freddie Mercury"
        }
      }
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly", () => {
    let tree = null;

    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <TransactionPanel index={1} transaction={otherProps.transaction}></TransactionPanel>
        </Provider>
      );
    });
    it("Should contain two elements", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(2);
    });
    it("Should contain two labelled elements within the tree", () => {
        let elements = tree.root.findAllByProps({label:"Timestamp"});
        expect(elements.length).toEqual(2);
      });
  });
});
