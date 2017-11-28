import React from "react";
import { shallow } from "enzyme";

import Tab from "./Tab";

describe("Tab", () => {
  it("renders", () => {
    expect(
      shallow(
        <Tab tab={{ title: "Title", url: "url", id: 1, favIconUrl: "path/to/img" }} />
      )
    ).toMatchSnapshot();
  });
});
