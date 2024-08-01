import Swiper from 'swiper';
import vars from "../_vars";
import {Navigation} from 'swiper/modules';

document.addEventListener("DOMContentLoaded", function(e) {

const {
  filterSliders,
} = vars;

  filterSliders && filterSliders.forEach(function(slider){
    const swiper = slider.querySelector('.swiper-container');
    const sliderPrev = slider.querySelector('.swiper-button-prev');
    const sliderNext = slider.querySelector('.swiper-button-next');
    let flag = true;

    new Swiper(swiper, {
      modules: [Navigation],
      spaceBetween  : 20,
      slidesPerView : 1,
      speed         : 800,
      observer      : true,
      observeParents: true,

      navigation: {
        nextEl: sliderNext && sliderNext,
        prevEl: sliderPrev && sliderPrev,
      },

    });

  });

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
})










