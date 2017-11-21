const main = document.querySelector("main");
const spacesByWindow = new Map([[1, new Map()]]);

function getSpacesForWindow(windowId) {
  // TODO: Handle different windows.
  return spacesByWindow.get(1);
}

/**
 * list tabs
 */
async function listTabs() {
  const spacesEl = document.createDocumentFragment();
  main.innerHTML = "";

  const tabs = await getCurrentWindowTabs();
  const spaces = getSpacesForWindow();

  if (spaces.size === 0) {
    spaces.set(1, {
      id: 1,
      title: "default",
      tabs,
    })
  }

  spaces.forEach(space => {
    const spaceEl = e("section", {},
      e("header", {},
        e("h2", {}, space.title),
        spaces.size > 1
          ? e("button", {
              class: "space-close close"
            }, "✕")
          : null
      )
    );

    space.tabs.forEach(tab => {
      spaceEl.appendChild(e("a", {
          class: "tab",
          "data-id": tab.id,
          title: tab.title,
          href: tab.url,
        },
        e("div", { class: "tab-screen" }),
        e("img", { class: "tab-favicon", src: tab.favIconUrl }),
        e("button", { class: "tab-close close" }, "✕"),
        e("span", { class: "tab-origin" }, (new URL(tab.url)).host.replace("www.", ""))
      ));
    });

    spaceEl.appendChild(
      e("button", {
        class: "tab-create",
      }, "+")
    );

    spacesEl.appendChild(spaceEl);
  });

  main.appendChild(spacesEl);
}

document.addEventListener("DOMContentLoaded", listTabs);

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
