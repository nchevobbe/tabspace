// @flow
import type { Browser, TabType, TabIdType } from "./types.flow";
declare var browser: Browser;

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "./reducers";

import PinnedTabs from "./components/PinnedTabs";
import Spaces from "./components/Spaces";
import SpaceTabs from "./components/SpaceTabs";

import { getCurrentWindowTabs, getPinnedTabs } from "./utils";

(async function render() {
  const windowId = "1";
  let activeSpaceId = "1";
  const tabs = await getCurrentWindowTabs(browser);

  const stubSpace = new Map([
    [
      "1",
      {
        id: "1",
        title: "work",
        tabs: tabs.filter(tab => !tab.pinned),
        active: true,
      },
    ],
  ]);

  const spacesByWindow = new Map([["1", stubSpace]]);
  const spaces = spacesByWindow.get(windowId);
  const activeSpace = spaces ? spaces.get(activeSpaceId) : null;
  const spaceTabs = activeSpace ? activeSpace.tabs : null;
  let store = createStore(reducer);

  const container = document.getElementById("app-root");

  if (container) {
    ReactDOM.render(
      <Provider store={store}>
        <main>
          <PinnedTabs tabs={getPinnedTabs(tabs)} onTabClick={setActiveTab} />
          <Spaces />
          <SpaceTabs
            tabs={spaceTabs || []}
            onTabClick={setActiveTab}
            onCloseButtonClick={closeTab}
            onNewTabButtonClick={createTab}
          />
        </main>
      </Provider>,
      container
    );
  }
})();

function setActiveTab(tabId: TabIdType): Promise<TabType> {
  return browser.tabs.update(tabId, {
    active: true,
  });
}

function closeTab(tabId: TabIdType): Promise<void> {
  return browser.tabs.remove(tabId);
}

function createTab(): Promise<TabType> {
  return browser.tabs.create({});
}
