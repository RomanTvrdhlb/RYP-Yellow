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

// document.addEventListener("DOMContentLoaded", () => {
//   const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const currentYear = new Date().getFullYear();
//   const yearRange = 10; // Діапазон років, які будуть відображатися

//   const dateSelectHeader = document.getElementById('date-select-header');
//   const dateSelectBody = document.getElementById('date-select-body');
//   const selectedDate = document.getElementById('selected-date');

//   // Populate months
//   months.forEach((month, index) => {
//       const option = document.createElement('div');
//       option.className = 'date-select__option';
//       option.textContent = month;
//       option.dataset.value = `${index + 1}-month`;
//       dateSelectBody.insertBefore(option, dateSelectBody.querySelector('.date-select__option-group + .date-select__option-group'));

//       option.addEventListener('click', () => {
//           selectedDate.textContent = month;
//           dateSelectBody.style.display = 'none';
//       });
//   });

//   // Populate years
//   for (let year = currentYear - yearRange; year <= currentYear + yearRange; year++) {
//       const option = document.createElement('div');
//       option.className = 'date-select__option';
//       option.textContent = year;
//       option.dataset.value = `${year}-year`;
//       dateSelectBody.appendChild(option);

//       option.addEventListener('click', () => {
//           selectedDate.textContent = year;
//           dateSelectBody.style.display = 'none';
//       });
//   }

//   dateSelectHeader.addEventListener('click', () => {
//       dateSelectBody.style.display = dateSelectBody.style.display === 'block' ? 'none' : 'block';
//   });

//   // Закриття меню при кліку поза його межами
//   document.addEventListener("click", function (event) {
//       if (!dateSelectHeader.contains(event.target) && !dateSelectBody.contains(event.target)) {
//           dateSelectBody.style.display = 'none';
//       }
//   });
// });