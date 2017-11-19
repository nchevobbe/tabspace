async function getCurrentWindowTabs() {
  const tabs = await getAllCurrentWindowTabs();
  return tabs.filter(tab => !isTabSpaceTab(tab));
}

function getAllCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

async function getTabSpaceTab() {
  const tabs = await getAllCurrentWindowTabs();
  return tabs.find(isTabSpaceTab);
}

function isTabSpaceTab(tab) {
  return tab.url.includes("src/tabspace.html")
}
