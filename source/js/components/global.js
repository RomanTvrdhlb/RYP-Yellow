import {toggleCustomClass, fadeIn, fadeOut, addCustomClass, removeCustomClass} from '../functions/customFunctions';

const navBox = document.querySelector('.nav-box');
const hideParent = document.querySelector('[data-hide-parent]');
const dataHidden = document.querySelectorAll("[data-clip]");
const warnCards = document.querySelectorAll('.warn-card');
const servicesCards = document.querySelectorAll('.services-card');
const serviceCards = document.querySelectorAll('.service-card');
const textAreas = document.querySelectorAll('textarea[data-area]');
const bannerCards = document.querySelectorAll('.banner-card');

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

if (dataHidden) {
  dataHidden.forEach(function (item) {
    const btn = item.querySelector("[data-clip-btn]");
    const box = item.querySelector("[data-clip-item]");

    const computedStyle = window.getComputedStyle(box);
    const originalHeight = parseInt(
      computedStyle.getPropertyValue("max-height")
    );

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = box.getAttribute("data-clip-item") === "true";

      if (!isOpen) {
        btn.innerHTML = 'Hide text';
        box.style.maxHeight = box.scrollHeight + "px";
        toggleCustomClass(btn, "active");
        setTimeout(function () {
          box.style.overflow = "auto";
        }, 450);
      } else {
        btn.innerHTML = 'Show text';
        box.style.maxHeight = originalHeight + "px";
        toggleCustomClass(btn, "active");
        box.style.overflow = "hidden";
      }

      box.setAttribute("data-clip-item", !isOpen);
    });

    box.style.transition = "max-height 0.2s linear";
  });
}

if(warnCards){
  warnCards.forEach(function(card){
    const closeBtn = card.querySelector('.warn-card__close');
    const item = card.parentNode;
    const parent = item.parentNode;

    closeBtn && closeBtn.addEventListener('click', function(e){
      e.preventDefault();
      item.removeChild(card);
      item.remove();

      if (parent.children.length === 0) {
        parent.remove();
      }
    })
  })
}

if(servicesCards){
  servicesCards.forEach(function(card){
    const closeBtn = card.querySelector('.services-card__close');
    const item = card.parentNode;
    const parent = item.parentNode;

    closeBtn && closeBtn.addEventListener('click', function(e){
      e.preventDefault();
      item.removeChild(card);
      item.remove();

      if (parent.children.length === 0) {
        parent.remove();
      }
    })
  })
}

if (serviceCards) {
  serviceCards.forEach(function(card) {
      const wrapp = card.querySelector('.service-card__wrapp');
      const btn = card.querySelector('.edit-btn');
      const close = card.querySelector('.service-card__close');

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (wrapp.style.maxHeight) {
            wrapp.style.maxHeight = null;
            removeCustomClass(card, 'active');
        } else {
            wrapp.style.maxHeight = wrapp.scrollHeight + 'px';
            addCustomClass(card, 'active');
        }

        if(card.classList.contains('active')){
          window.addEventListener("resize", () => {
            wrapp.style.maxHeight = wrapp.scrollHeight + 'px';
          });
        }
      });

      close.addEventListener('click', function(e){
        e.preventDefault();
        wrapp.style.maxHeight = null;
        removeCustomClass(card, 'active');
      })
  });
}

if(textAreas){
  const maxChars = 64;

  textAreas.forEach(textArea => {
      textArea.addEventListener('input', limitLines);
      window.addEventListener('resize', limitLines);
      limitLines();
  });

  function isMobile() {
      return window.innerWidth <= 450;
  }

  function limitLines() {
      if (isMobile()) {
          textAreas.forEach(textArea => {
              if (textArea.value.length > maxChars) {
                  textArea.value = textArea.value.slice(0, maxChars) + '...';
              }
          });
      }
  }
}

if(bannerCards){
  bannerCards.forEach(card => {
  card.addEventListener('click', function() {
      const link = this.getAttribute('data-link');
      if (link) {
          window.open(link, '_blank');
      }
  });
});
}