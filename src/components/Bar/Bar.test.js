import React from "react";
import renderer from "react-test-renderer";
import Bar, { mapStateToProps } from "./Bar";
import { Provider } from "react-redux";
import { createStore } from "redux";
import moment from "moment";

describe("Bar component tests", () => {
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
  describe("Render properly when loading", () => {
    let tree = null;
    const appState = {
      transactions: null
    };
    function myReducer(state = appState, action) {
      return state;
    }
    beforeEach(() => {
      tree = renderer.create(
        <Provider store={createStore(myReducer)}>
          <Bar></Bar>
        </Provider>
      );
    });
    it("Should contain one element", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(1);
    });
    it("Should display loading spinner when loading", () => {
      let child = tree.toJSON().children[0];
      expect(child.props.role).toEqual("progressbar");
    });
  });
  describe("Render properly after loading", () => {
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
          <Bar></Bar>
        </Provider>
      );
    });
    it("Should display children after loading", () => {
      let children = tree.toJSON().children;
      expect(children.length).toBeGreaterThan(0);
    });
  });
});
