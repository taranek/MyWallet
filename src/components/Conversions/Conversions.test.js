import React from "react";
import renderer from "react-test-renderer";
import Conversions, { mapStateToProps } from "./Conversions";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("Conversions component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        rates: { CAD: 1.4608, HKD: 8.6361, PLN: 4.5 },
      };
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly when rates are null", () => {
    let tree = null;
    const appState = {
      rates:null,
    };
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <Conversions></Conversions>
        </Provider>
      );
    });
    it("Should contain three elements", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(3);
    });
    it("Should display 2 progress bars when loading", () => {
      let progressBars = tree.root.findAllByProps({role:'progressbar'});
      expect(progressBars.length).toEqual(2);
    });
  });
  describe("Render properly after loading", () => {
    let tree = null;

    const appState = {
      rates: { CAD: 1.4608, HKD: 8.6361, PLN: 4.5 },
    };
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <Conversions></Conversions>
        </Provider>
      );
    });
    it("Should not display progress bards after loading", () => {
      let progressBars = tree.root.findAllByProps({role:'progressbar'});
      expect(progressBars.length).toEqual(0);
    });
  });
});
