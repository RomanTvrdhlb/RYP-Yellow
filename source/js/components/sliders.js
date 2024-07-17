import Swiper from 'swiper';
import vars from "../_vars";

import {Navigation} from 'swiper/modules';

// const {
//   bannerSliders,
// } = vars;


// ratingSliders && ratingSliders.forEach(function(slider){
//   const swiper = slider.querySelector('.swiper-container');
//   const sliderPrev = slider.querySelector('.arrow-button--prev');
//   const sliderNext = slider.querySelector('.arrow-button--next');
//   let flag = true;

//   new Swiper(swiper, {
//     modules: [Navigation],
//     spaceBetween  : 30,
//     slidesPerView : 3,
//     speed         : 800,
//     observer      : true,
//     observeParents: true,

//     navigation: {
//       nextEl: sliderNext && sliderNext,
//       prevEl: sliderPrev && sliderPrev,
//     },

//     breakpoints: {
//       0: {
//         slidesPerView: 'auto',
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
    
//     on: {
//       slideChangeTransitionStart: function () {
//         if (window.innerWidth > 1240 && flag) {
//           sliderPrev.style.display = 'flex';
//           sliderPrev.style.marginRight = 'auto';
//           flag = false;
//         }
//       }
//     }
//   });
//   window.addEventListener('resize', function() {
//     if (window.innerWidth <= 1240) {
//       sliderPrev.style.marginRight = '0';
//     } else {
//       sliderPrev.style.marginRight = 'auto';
//     }
//   });
// });


let swipers = [];

function initSwipers() {
  const bannerSliders = document.querySelectorAll('.banner-slider');

  bannerSliders && bannerSliders.forEach(function(slider) {
    const swiperContainer = slider.querySelector('.swiper-container');
    const sliderPrev = slider.querySelector('.swiper-button-prev');
    const sliderNext = slider.querySelector('.swiper-button-next');

    if (window.innerWidth < 1024) {
      if (!swiperContainer.swiper) {
        const swiper = new Swiper(swiperContainer, {
          modules: [Navigation],
          spaceBetween  : 20,
          speed         : 800,
          observer      : true,
          observeParents: true,
          autoHeight    : true,
          navigation: {
            nextEl: sliderNext,
            prevEl: sliderPrev,
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            650: {
              slidesPerView: 2,
            },
          },
        
        });
        swipers.push(swiper);
      }
    } else {
      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true);
      }
    }
  });
}

window.addEventListener('load', initSwipers);
window.addEventListener('resize', initSwipers);














