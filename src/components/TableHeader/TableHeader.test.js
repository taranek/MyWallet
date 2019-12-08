import React from "react";
import renderer from "react-test-renderer";
import TableHeader from "./TableHeader";

describe("TableHeader component tests", () => {
  describe("Render properly when all children are string", () => {
    let tree = null;
    let text = "SomeText";
    beforeEach(() => {
      tree = renderer.create(<TableHeader>{text}</TableHeader>);
    });
    it("Should contain one element", () => {
      let component = tree.toJSON();
      expect(component.children.length).toEqual(1);
    });
    it("Should display passed children text", () => {
      let child = tree.toJSON().children[0];
      expect(child).toEqual(text);
    });
  });
});
