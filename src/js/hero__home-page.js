import Swiper from '../../node_modules/swiper/swiper-bundle.min.mjs';

// import Swiper from '../../node_modules/swiper/swiper-bundle.min.mjs'
import { Pagination, EffectCards, A11y, EffectCoverflow } from 'swiper/modules';

// Define base configuration for Mobile Hero Swiper
// Inspired by https://codepen.io/kristen17/pen/ExpZXLz & i like this for the future: https://codepen.io/sandhya_subram/pen/KKVxWgd & https://codepen.io/shamim539/pen/vdaqQG
const mobileSwiperConfig = { 
  module: [ Pagination, EffectCoverflow, A11y ],
  grabCursor: true,
  centeredSlides: true,
  allowTouchMove: true,
  slidesPerView: "auto",
  effect: "coverflow",
  coverflowEffect: {
    rotate: 5,
    stretch: 0,
    depth: 100,
    modifier: 1,
  },
  spaceBetween: 40,
  loop: true,
  speed: 1200,
  autoplay: { delay: 4000 },
  // lazyPreloaderClass: "swiper-lazy-preloader",
  // lazyPreloadPrevNext: 1,
  pagination: {
    el: ".swiper-pagination", 
    clickable: true,
    type: 'bullets',
  },
  breakpoints: {
    0: {
      autoplay: { delay: 4000 },
      spaceBetween: 25
    },
    481: {
      spaceBetween: 40
    },
    600: {
      spaceBetween: 50
    },
    // Stop's auto play on large screens to save resources
    990: {
      autoplay: false,
    }
  },
  a11y: true,
  on: {
    init: function () {
      // console.log('swiper initialized');
      const elements = document.querySelectorAll('.hero__swiper--sm .swiper-slide');
      elements.forEach((element) => {
        element.classList.add('hero_slider_loaded');
      });
      const firstSlideElement = document.querySelectorAll('.hero_first_slide_sm');
      firstSlideElement.forEach((element) => {
        element.classList.remove('hero_first_slide_sm');
      });
      const notFirstSlideElement = document.querySelectorAll('.hero_not_first_slide_sm');
      notFirstSlideElement.forEach((element) => {
        element.classList.remove('hero_not_first_slide_sm');
      });
    },
  },
};

// Define base configuration for Desktop Hero Swiper 
const largeSwiperConfig = {
  module: [ Pagination, EffectCards, A11y ],
  spaceBetween: 10,
  speed: 1200,
  autoplay: { delay: 4000 },
  // No autoplay set be default so no extra resources are being used on smaller screens where this swiper is not visable
  // Starts auto play on large screens to create effect
  breakpoints: {
    0: {
      autoplay: false
    },
    990: {
      autoplay: { delay: 4000 }
    }
  },
  loop: true,
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 1,
  loopedSlides: 2,
  updateOnWindowResize: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  effect: 'cards',
  cardsEffect: {
    perSlideOffset: 6,
    perSlideRotate: 2,
    rotate: true,
    slideShadows: true,
  },
  a11y: true,
  on: {
    init: function () {
      // console.log('swiper initialized');
      const elements = document.querySelectorAll('.hero__swiper--lg .swiper-slide');
      elements.forEach((element) => {
        element.classList.add('hero_slider_loaded');
      });
      const firstSlideElement = document.querySelectorAll('.hero_first_slide_lg');
      firstSlideElement.forEach((element) => {
        element.classList.remove('hero_first_slide_lg');
      });
      const notFirstSlideElement = document.querySelectorAll('.hero_not_first_slide_lg');
      notFirstSlideElement.forEach((element) => {
        element.classList.remove('hero_not_first_slide_lg');
      });
      // Remove this last as it's overflow hidden so we know all the other styles have been applied at this point
      const lgSliderElement = document.querySelectorAll('.hero__swiper--onload-o-hidden');
      lgSliderElement.forEach((element) => {
        setTimeout(() => {
          element.classList.remove('hero__swiper--onload-o-hidden');
        }, 100);
      });
    },
  },
};

// Initializes the Swiper sliders
const initSwipers = () => {
  new Swiper(".hero__swiper--sm", mobileSwiperConfig);
  new Swiper(".hero__swiper--lg", largeSwiperConfig);
};

// Wait for the DOM to fully load before initializing the Swiper sliders
document.addEventListener('DOMContentLoaded', () => {
  initSwipers();
});