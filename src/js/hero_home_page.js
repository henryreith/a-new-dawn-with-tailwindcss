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
  initialSlide: 1,
  spaceBetween: 40,
  loop: true,
  speed: 1200,
  autoplay: { delay: 3000 },
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 1,
  pagination: {
    el: ".swiper-pagination", 
    clickable: true,
    type: 'bullets',
  },
  breakpoints: {
    10: {
      spaceBetween: 25
    },
    481: {
      spaceBetween: 40
    },
    600: {
      spaceBetween: 50
    }
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
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
    },
  },
};

// Define base configuration for Desktop Hero Swiper 
const largeSwiperConfig = {
  module: [ Pagination, EffectCards, A11y ],
  spaceBetween: 10,
  speed: 1200,
  initialSlide: 1,
  autoplay: { delay: 3000 },
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
    perSlideOffset: 8,
    perSlideRotate: 2,
    rotate: true,
    slideShadows: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
  on: {
    init: function () {
      // console.log('swiper initialized');
      const elements = document.querySelectorAll('.hero__swiper--lg .swiper-slide');
      elements.forEach((element) => {
        element.classList.add('hero_slider_loaded');
      });
    },
  },
};

// Initializes the Swiper slider for highlighted products
const initSwipers = () => {
  new Swiper(".hero__swiper--sm", mobileSwiperConfig);
  new Swiper(".hero__swiper--lg", largeSwiperConfig);
};

// let mobileSwiper;
// let largeSwiper;

// Wait for the DOM to fully load before initializing the Swiper slider
document.addEventListener('DOMContentLoaded', () => {
  Swipers = initSwipers();
});