import {addCustomClass, removeCustomClass } from "../functions/customFunctions";

const closeSelect = function (selectBody, select , className = "active") {
  selectBody.style.height = 0;
  removeCustomClass(select, className);
};

const openSelect = function (selectBody, select , className = "active") {
  selectBody.style.height = "auto";
  addCustomClass(select, className);
};

const checkIsSelectOpen = function (select) {
  return select.classList.contains('active');
}

const select = document.querySelectorAll("[data-select]");

if (select.length) {
  select.forEach((item) => {
    const selectCurrent = item.querySelector(".select__current");
    const selectInput = item.querySelector(".select__input");
    const selectOptions = [...item.querySelectorAll("svg")];
    const selectBody = item.querySelector(".select__body");

    selectOptions.map((option) => {
      option ? option.style.pointerEvents = "none" : '';
    });

    if (selectInput) {
      const currentId = selectCurrent.getAttribute("data-id");
      selectInput.setAttribute("value", currentId);
    }

    item.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() !== 'a') {
        e.preventDefault();
      }

      const isSelectOpen = checkIsSelectOpen(item);
      const el = e.target.dataset.type;
      const innerSelect = e.target.innerHTML;
      let items = item.querySelectorAll(`.select__list [data-id]`);
      let currentItem = item.querySelector(`.select__list [data-id='${selectInput.getAttribute("value")}']`)

      if (el === "option") {
        selectCurrent.innerHTML = innerSelect;
        selectInput.setAttribute("value", e.target.getAttribute("data-id"));
        selectCurrent.setAttribute("data-id", e.target.getAttribute("data-id"));
        addCustomClass(selectCurrent, 'check');
      }

      items.forEach(function (item) {item.style.display = "flex"});
      currentItem.style.display = "none";
    

      if (isSelectOpen) {
        closeSelect(selectBody, item);
      } else {
        openSelect(selectBody, item)
      }
    });


    document.addEventListener("click", function (event) {
      if (!item.contains(event.target) && checkIsSelectOpen(item)) {
        closeSelect(selectBody, item);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll('.date-select');

  selects && selects.forEach(function(select){
    const monthSelect = select.querySelector('[data-month]');
    const yearSelect = select.querySelector('[data-year]');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
    }

      monthSelect.selectedIndex = currentMonth;
      yearSelect.value = currentYear;
  })

});