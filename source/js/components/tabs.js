import {
  removeClassInArray,
  addCustomClass,
  removeCustomClass,
  addClassInArray
} from "../functions/customFunctions";

// --------------- tabs custom function --------------- //

const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  tabsAsideAttr,
  active = "active"
) {
  tabsDataInitArray &&
    tabsDataInitArray.forEach((tabParent) => {
      if (tabParent) {
        const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
        const tabContent = [
          ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
        ];
        const tabAside = [
          ...tabParent.querySelectorAll(`[${tabsAsideAttr}]`),
        ];

        tabNav.map((nav) => {
          nav.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
            removeClassInArray(tabNav, active);
            removeClassInArray(tabContent, active);
            removeClassInArray(tabAside, active);
            addClassInArray(
              tabParent.querySelectorAll(`[${tabsNavAttr}="${activeTabAttr}"]`),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsContentAttr}="${activeTabAttr}"]`
              ),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsAsideAttr}="${activeTabAttr}"]`
              ),
              active
            );
          });
        });
      }
    });
};

document.addEventListener("DOMContentLoaded", function(e) {
  tabsFunction(document.querySelectorAll("[data-tabs-parrent]"), "data-tab", "data-tab-content", "data-aside-content");
})