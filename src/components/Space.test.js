import React from "react";
import { shallow } from "enzyme";

import Space from "./Space";

describe("Space", () => {
  it("renders active space as expected", () => {
    expect(shallow(<Space active={true} id="1" title="test" />)).toMatchSnapshot();
  });

  it("renders inactive space as expected", () => {
    expect(shallow(<Space active={false} id="1" title="test" />)).toMatchSnapshot();
  });

  it("handles selectSpace prop as expected", () => {
    const selectSpace = jest.fn();
    const id = Symbol();
    const element = shallow(<Space id={id} title="test" selectSpace={selectSpace} />);
    expect(element).toMatchSnapshot();

    element.simulate("click", { type: "click" });
    expect(selectSpace.mock.calls.length).toEqual(1);
    expect(selectSpace.mock.calls[0][0]).toEqual(id);
  });

  it("handles deleteSpace prop as expected", () => {
    const deleteSpace = jest.fn();
    const stopPropagation = jest.fn();
    const id = Symbol();
    const element = shallow(<Space id={id} title="test" deleteSpace={deleteSpace} />);
    expect(element).toMatchSnapshot();

    const node = element.find(".space-delete");
    node.simulate("click", { type: "click", stopPropagation });

    expect(node.exists()).toBeTruthy();
    expect(deleteSpace.mock.calls.length).toEqual(1);
    expect(deleteSpace.mock.calls[0][0]).toEqual(id);

    expect(stopPropagation.mock.calls.length).toEqual(1);
  });
});
