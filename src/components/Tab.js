// @flow
import type { TabType, TabIdType } from "../types.flow";
import React from "react";

export default (props: {
  tab: TabType,
  onTabClick: TabIdType => Promise<TabType>,
  onCloseButtonClick: TabIdType => Promise<void>,
}) => {
  const { tab, onTabClick, onCloseButtonClick } = props;
  const { title, url, id, favIconUrl } = tab;
  return (
    <a
      className="tab"
      href={url}
      title={title}
      onClick={e => {
        e.preventDefault();
        onTabClick(id);
      }}
    >
      <div className="tab-thumbnail" />
      <img className="tab-favicon" src={favIconUrl} />
      <button
        className="tab-close clean"
        title="Close tab"
        onClick={e => {
          e.stopPropagation();
          onCloseButtonClick(id);
        }}
      />
      <span className="tab-title">{title}</span>
    </a>
  );
};
