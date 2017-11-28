// @flow
import type { Browser, TabType } from "./types.flow";

let id = 0;
function getSpaceId(): number {
  id++;
  return id;
}

function getAllCurrentWindowTabs(browser: Browser): Promise<Array<TabType>> {
  return browser.tabs.query({ currentWindow: true });
}

async function getTabSpaceTab(browser: Browser): Promise<?TabType> {
  const tabs = await getAllCurrentWindowTabs(browser);
  return tabs.find(isTabSpaceTab);
}

async function getCurrentWindowTabs(browser: Browser): Promise<Array<TabType>> {
  const tabs = await getAllCurrentWindowTabs(browser);
  return tabs.filter(tab => !isTabSpaceTab(tab));
}

function isTabSpaceTab(tab: TabType): boolean {
  return tab.url.includes("src/tabspace.html");
}

function getPinnedTabs(tabs: Array<TabType>): Array<TabType> {
  return tabs.filter(tab => tab.pinned);
}

export {
  getCurrentWindowTabs,
  getAllCurrentWindowTabs,
  getTabSpaceTab,
  isTabSpaceTab,
  getSpaceId,
  getPinnedTabs,
};
