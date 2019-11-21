import React from "react";
import renderer from "react-test-renderer";
import Conversions, { mapStateToProps } from "./Conversions";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("Conversions component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        loading:true
      };
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly when loading", () => {
    let tree = null;
    const appState = {
      loading:true,
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
      loading:false,
      rates: {
        CHF:1.23,
        EUR:4.22
      }
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
