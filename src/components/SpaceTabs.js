// @flow
import React from "react";
import Tab from "./Tab";
import type { TabType, TabIdType } from "../types.flow";

type PropsType = {
  tabs: Array<TabType>,
  onTabClick: TabIdType => Promise<TabType>,
  onCloseButtonClick: TabIdType => Promise<void>,
  onNewTabButtonClick: void => Promise<TabType>,
};

export default (props: PropsType) => {
  const { tabs, onTabClick, onCloseButtonClick, onNewTabButtonClick } = props;

  return (
    <section>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          tab={tab}
          onTabClick={onTabClick}
          onCloseButtonClick={onCloseButtonClick}
        />
      ))}
      <button className="tab-create" onClick={onNewTabButtonClick} />
    </section>
  );
};
