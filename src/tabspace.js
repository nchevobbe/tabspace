const tabsList = document.getElementById('tabs-list');

/**
 * list tabs
 */
async function listTabs() {
  const tabs = await getCurrentWindowTabs();
  let currentTabs = document.createDocumentFragment();
  tabsList.innerHTML = '';

  for (let tab of tabs) {
    let tabEl = document.createElement('li');
    tabEl.textContent = tab.title || tab.id;
    tabEl.setAttribute('data-id', tab.id);
    tabEl.classList.add('switch-tabs');
    const btn = document.createElement('button');
    btn.textContent = "✕";
    btn.classList.add("close-tab");
    tabEl.appendChild(btn);
    currentTabs.appendChild(tabEl);
  }
  tabsList.appendChild(currentTabs);
}

document.addEventListener("DOMContentLoaded", listTabs);

document.addEventListener("click", async (e) => {
  if (e.target.id === "tabs-create") {
    browser.tabs.create({});
    return;
  }

  if (e.target.classList.contains('switch-tabs')) {
    var tabId = e.target.getAttribute('data-id');
    browser.tabs.update(parseInt(tabId), {
      active: true
    });
    return;
  }


  if (e.target.classList.contains('close-tab')) {
    var tabId = e.target.closest("[data-id]").getAttribute('data-id');
    browser.tabs.remove(parseInt(tabId));
  }

  e.preventDefault();
});

//onRemoved listener. fired when tab is removed
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if(removeInfo.isWindowClosing) {
    return;
  }

  const tabEl = document.querySelector(`[data-id="${tabId}"]`);
  if (tabEl) {
    tabEl.remove();
  }
});

//onMoved listener. fired when tab is moved into the same window
browser.tabs.onMoved.addListener((tabId, moveInfo) => {
  var startIndex = moveInfo.fromIndex;
  var endIndex = moveInfo.toIndex;
  console.log(`Tab with id: ${tabId} moved from index: ${startIndex} to index: ${endIndex}`);
});

browser.tabs.onActivated.addListener(async () => {
  const tabspaceTab = await getTabSpaceTab();
  if (tabspaceTab) {
    browser.tabs.remove(tabspaceTab.id);
  }
});
