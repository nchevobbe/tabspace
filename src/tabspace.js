const main = document.querySelector("main");
const spacesByWindow = new Map([["1", new Map()]]);

function getSpacesForWindow(windowId) {
  // TODO: Handle different windows.
  return spacesByWindow.get("1");
}

/**
 * list tabs
 */
async function render() {
  const fragment = document.createDocumentFragment();
  main.innerHTML = "";

  const tabs = await getCurrentWindowTabs();
  const spaces = getSpacesForWindow();

  if (spaces.size === 0) {
    spaces.set("1", {
      id: "1",
      title: "work",
      tabs: tabs.filter(tab => !tab.pinned),
      active: true,
    });

    spaces.set("2", {
      id: "2",
      title: "shopping",
      tabs,
    });

    spaces.set("3", {
      id: "3",
      title: "references",
      tabs,
    });
  }

  fragment.appendChild(renderSpaces(spaces));
  fragment.appendChild(renderPinnedTabs(tabs));
  fragment.appendChild(renderSpaceTabs(spaces.get("1")));

  main.appendChild(fragment);
}

function renderSpaces(spaces) {
  const spacesEl = e("ul", {class: "spaces"});
  spaces.forEach(space => {
    spacesEl.appendChild(renderSpace(space));
  });
  spacesEl.appendChild(e("button", {class: "space-add clean"}));
  return spacesEl;
}

function renderSpace(space) {
  return e("li", {
      class: space.active ? "active" : null,
      "content-editable": true,
    },
    space.title,
    e("button", {class: "space-close clean"})
  );
}

function renderPinnedTabs(tabs) {
  const bar = e("aside", {class: "pinned"});
  for (const tab of tabs) {
    if (tab.pinned) {
      bar.appendChild(e("img", {src: tab.favIconUrl}));
    }
  }
  return bar;
}

function renderSpaceTabs(space) {
  const spaceEl = e("section", {
      "data-space-id": space.id
    },
  );

  space.tabs.forEach(tab => {
    spaceEl.appendChild(e("a", {
        class: "tab",
        "data-id": tab.id,
        title: tab.title,
        href: tab.url,
      },
      e("div", { class: "tab-thumbnail" }),
      e("img", { class: "tab-favicon", src: tab.favIconUrl }),
      e("button", { class: "tab-close clean" }),
      e("span", { class: "tab-title" }, tab.title)
    ));
  });

  spaceEl.appendChild(
    e("button", {
      class: "tab-create",
    })
  );
  return spaceEl;
}

document.addEventListener("DOMContentLoaded", render);

document.addEventListener("click", async (e) => {
  e.preventDefault();

  if (e.target.classList.contains("tab-create")) {
    browser.tabs.create({});
    return;
  }

  if (e.target.classList.contains("tab-close")) {
    const tabId = e.target.closest("[data-id]").getAttribute("data-id");
    browser.tabs.remove(parseInt(tabId));
    return;
  }

  if (e.target.classList.contains("tab-close")) {
    const tabId = e.target.closest("[data-id]").getAttribute("data-id");
    browser.tabs.remove(parseInt(tabId));
    return;
  }

  if (e.target.closest("[data-id]")) {
    var tabId = e.target.closest("[data-id]").getAttribute("data-id");
    browser.tabs.update(parseInt(tabId), {
      active: true
    });
    return;
  }
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

browser.tabs.onActivated.addListener(async () => {
  const tabspaceTab = await getTabSpaceTab();
  if (tabspaceTab) {
    browser.browserAction.setIcon({
      path: "/icons/tabspace.svg"
    });
    browser.tabs.remove(tabspaceTab.id);
  }
});
