import React from "react";
import renderer from "react-test-renderer";
import TransactionListHeader from "./TransactionListHeader";

describe("TransactionListHeader component tests", () => {
  describe("Render properly when all children are string", () => {
    let tree = null;
    let base = "PLN";
    let currency = "EUR";
    beforeEach(() => {
      tree = renderer.create(
        <TransactionListHeader base={base} targetCurrency={currency} />
      );
    });
    it("Should render 4 columns", () => {
      let children = tree.toJSON().children;
      expect(children.length).toEqual(4);
    });
  });
});
