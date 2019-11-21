import React from "react";
import renderer from "react-test-renderer";
import TransactionAmount from "./TransactionAmount";

describe("TableHeader component tests", () => {
  describe("Render properly when all children are string", () => {
    let tree = null;
    let positiveAmount = 2.50;
    let currency = "EUR";
    beforeEach(() => {
      tree = renderer.create(
        <TransactionAmount amount={positiveAmount} currency={currency}/>
      );
    });
    it("Should display value", () => {
      let children = tree.toJSON().children;
      expect(children).toContain(Number(positiveAmount).toFixed(2));
    });
    it("Should display currency", () => {
      let children = tree.toJSON().children;
      expect(children).toContain(currency);
    });
    it("Should assign className based on amount", () => {
      let props = tree.toJSON().props;
      expect(props['className']).toContain('amountPlus');
    });
  });
});
