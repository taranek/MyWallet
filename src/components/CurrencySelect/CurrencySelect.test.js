import React from "react";
import renderer from "react-test-renderer";
import CurrencySelect, { mapStateToProps } from "./CurrencySelect";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("AccountSummary component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        targetCurrency: "PLN",
        rates: { CAD: 1.4608, HKD: 8.6361, ISK: 135.9 }
      };
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly", () => {
    let tree = null;
    const appState = {
      targetCurrency: "PLN",
      rates: { CAD: 1.4608, HKD: 8.6361, ISK: 135.9 }
    };
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <CurrencySelect></CurrencySelect>
        </Provider>
      );
    });
    it("Should contain option for each currency", () => {
      let component = tree.root;
      let element = component.findByProps({ id: "currency-select" });
      expect(element.props.children.length).toEqual(3);
    });
  });
});
