import {toggleCustomClass, fadeIn, fadeOut} from '../functions/customFunctions';

const navBox = document.querySelector('.nav-box');
const hideParent = document.querySelector('[data-hide-parent]');

if(navBox){
    const btn = navBox.querySelector('.nav-box__btn');
    const wrapp = navBox.querySelector('.nav-box__wrapp');
    const arrow = navBox.querySelector('.nav-box__arrow');
    const links = navBox.querySelectorAll('.nav-box__link');

    btn && btn.addEventListener('click', function(e){
        e.preventDefault();
        toggleCustomClass(wrapp, 'active');
        toggleCustomClass(arrow, 'active');
    })

    links.forEach(function(link){
        link.addEventListener('click', function(e){
            toggleCustomClass(wrapp, 'active');
            toggleCustomClass(arrow, 'active');
        })
    })
}

if (hideParent) {
    const items = hideParent.querySelectorAll(".filter-list__item");
    const showBtn = hideParent.querySelector(".hidden-btn");
    
    let flag = false;
  
    function toggleItems() {
      const mediaQuery = window.matchMedia('(min-width: 576px) and (max-width: 768px)');
      const threshold = mediaQuery.matches ? 4 : 3;
  
      items.forEach((item, index) => {
        if (index >= threshold) {
          fadeOut(item, 0);
  
          showBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!flag) {
              fadeIn(item, 200, "flex");
              showBtn.innerHTML = 'Turn down';
              setTimeout(function () {
                flag = true;
              }, 1000);
            } else {
              fadeOut(item, 0);
              showBtn.innerHTML = 'More categories';
              setTimeout(function () {
                flag = false;
              }, 1000);
            }
          });
        }
      });
    }
  
    toggleItems();
    window.addEventListener('resize', toggleItems);
}