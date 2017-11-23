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

/**
 * Utility function to create DOM element with populated attributes and content
 *
 * Usage :
 *
 * // simple element
 * let input = e("input", {
 *   type: "search",
 *   placeholder: "Enter what pleases you"
 * });
 *
 * // simple element with HTML content
 * let label = e("label", {},
 *   "<span>Hit <kbd>Esc</kbd> to close</span>"
 * );
 *
 * // nested elements
 * e("div", {
 *     "class": "tab-item",
 *   },
 *   e("label", {},
 *     e("input", {type: "radio", name: "type"}),
 *     "A"
 *   ),
 *   e("label", {},
 *     e("input", {type: "radio", name: "type", "disabled": true}),
 *     "B"
 *   )
 * )
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {String|Object} items
 * @returns {Element}
 */
function e(tagName, attributes = {}, ...items) {
  let element = document.createElement(tagName);

  for (let [attributeKey, attributeValue] of  Object.entries(attributes)) {
    if (attributeKey === "style") {
      for (let [propName, propValue] of Object.entries(attributeValue)) {
        element.style[propName] = propValue;
      }
    } else {
      element.setAttribute(attributeKey, attributeValue);
    }
  }

  if (items.length > 0) {
    let docFrag = document.createDocumentFragment();
    for (let childEl of items) {
      if(typeof childEl === "string") {
        let div = document.createElement("div");
        div.innerHTML = childEl;
        while (div.childNodes.length > 0) {
          docFrag.appendChild(div.childNodes[0]);
        }
      } else if(childEl) {
        docFrag.appendChild(childEl);
      }
    }

    element.appendChild(docFrag);
  }

  return element;
}
