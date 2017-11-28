/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 31));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ /***/ 31: function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(32);

      /***/
    },

    /***/ /***/ 32: function(module, exports) {
      browser.browserAction.onClicked.addListener(tabSpaceToggle);

      const url = browser.extension.getURL("./src/tabspace.html");

      async function tabSpaceToggle() {
        try {
          const tab = await getTabSpaceTab();
          if (tab) {
            // Close the tab.
            browser.browserAction.setIcon({
              path: "icons/tabspace.svg",
            });
            browser.tabs.onActivated.removeListener(tabSpaceToggle);
            await browser.tabs.remove(tab.id);
          } else {
            browser.browserAction.setIcon({
              path: "icons/tabspace-active.svg",
            });
            // Create the tab.
            await browser.tabs.create({
              url,
            });

            // We don't want to sync this URL ever nor clutter the users history
            browser.history.deleteUrl({ url });

            browser.tabs.onActivated.addListener(tabSpaceToggle);
          }
        } catch (e) {
          console.error("Error", { e });
        }
      }

      function getAllCurrentWindowTabs() {
        return browser.tabs.query({ currentWindow: true });
      }

      async function getTabSpaceTab() {
        const tabs = await getAllCurrentWindowTabs();
        return tabs.find(isTabSpaceTab);
      }

      function isTabSpaceTab(tab) {
        return tab.url.includes("src/tabspace.html");
      }

      /***/
    },

    /******/
  }
);
