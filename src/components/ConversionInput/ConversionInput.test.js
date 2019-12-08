import React from "react";
import renderer from "react-test-renderer";
import ConversionInput, { mapStateToProps } from "./ConversionInput";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("ConversionInput component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        targetCurrency: "PLN",
        rates: {
          PLN: 1.2
        }
      };
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly", () => {
    let tree = null;
    let currency = "CHF";
    let value = 2.3;
    let morePrecisedValue = 2.301232;
    let lessPrecisedValue = 2.3;
    const appState = {};
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <ConversionInput rate={value} currency={currency}></ConversionInput>
        </Provider>
      );
    });
    it("Should contain label with currency name", () => {
      let label = tree.root.findByType("label").props.htmlFor;
      expect(label).toEqual(currency);
    });
    it("Should display value", () => {
      let displayedValue = tree.root.findByType("input").props.value;
      expect(Number(displayedValue)).toEqual(Number(value));
    });
    it("Should display value with 2 decimal places precision - more precise value", () => {
      let displayedValue = tree.root.findByType("input").props.value;
      expect(displayedValue).toEqual(Number(morePrecisedValue).toFixed(2));
    });
    it("Should display value with 2 decimal places precision - less precise value", () => {
      let displayedValue = tree.root.findByType("input").props.value;
      expect(displayedValue).toEqual(Number(lessPrecisedValue).toFixed(2));
    });
  });
});
