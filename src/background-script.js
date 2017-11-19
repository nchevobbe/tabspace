browser.browserAction.onClicked.addListener(onIconClick);
const url = browser.extension.getURL("./src/tabspace.html");
let extensionTab = null;

async function onIconClick() {
  try {
    const tab = await getTabSpaceTab();
    if (tab) {
      // Close the tab.
      await browser.tabs.remove(tab.id);
    } else {
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
