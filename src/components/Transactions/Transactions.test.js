import React from "react";
import renderer from "react-test-renderer";
import Transactions, { mapStateToProps } from "./Transactions";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("Transactions component tests", () => {
  describe("Redux", () => {
    it("Should map state to props correctly", () => {
      const appState = {
        loading: true
      };
      const props = {};
      const componentState = mapStateToProps(appState, props);
      expect(componentState).toEqual(appState);
    });
  });
  describe("Render properly when loading", () => {
    let tree = null;
    const appState = {
      loading: true
    };
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <Transactions></Transactions>
        </Provider>
      );
    });
    it("Should contain five elements", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(5);
    });
    it("Should display progress bar when loading", () => {
      let progressBars = tree.root.findAllByProps({ role: "progressbar" });
      expect(progressBars.length).toEqual(1);
    });
  });
});
