// @flow
import type { TabType, TabIdType } from "../types.flow";
import React from "react";

type PropsType = {
  tabs: Array<TabType>,
  onTabClick: TabIdType => Promise<TabType>,
};

export default (props: PropsType) => {
  const { tabs, onTabClick } = props;
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return null;
  }

  return (
    <aside className="pinned">
      {tabs.map(tab => (
        <a
          key={tab.id}
          href={tab.title}
          className="pinned-tab"
          onClick={() => onTabClick(tab.id)}
        >
          <img src={tab.favIconUrl} />
        </a>
      ))}
    </aside>
  );
};
