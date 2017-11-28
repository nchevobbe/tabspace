import React from "react";
import { shallow } from "enzyme";

import PinnedTabs from "./PinnedTabs";

describe("PinnedTabs", () => {
  it("renders empty", () => {
    expect(shallow(<PinnedTabs />)).toMatchSnapshot();
  });

  it("renders with tabs", () => {
    expect(
      shallow(
        <PinnedTabs
          tabs={[
            { id: 1, title: "tab-1", url: "url", favIconUrl: "/path/to/image" },
            { id: 2, title: "tab", url: "url", favIconUrl: "/path/to/image" },
            { id: 3, title: "tab", url: "url" },
          ]}
        />
      )
    ).toMatchSnapshot();
  });
});
