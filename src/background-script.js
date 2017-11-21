browser.browserAction.onClicked.addListener(tabSpaceToggle);

const url = browser.extension.getURL("./src/tabspace.html");

async function tabSpaceToggle() {
  try {
    const tab = await getTabSpaceTab();
    if (tab) {
      // Close the tab.
      browser.browserAction.setIcon({
        path: "icons/tabspace.svg"
      });
      await browser.tabs.remove(tab.id);
    } else {
      browser.browserAction.setIcon({
        path: "icons/tabspace-active.svg"
      });
      // Create the tab.
      await browser.tabs.create({
        url
      });

      // We don't want to sync this URL ever nor clutter the users history
      browser.history.deleteUrl({url});
    }
  } catch (e) {
    console.error("Error", {e});
  }
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
