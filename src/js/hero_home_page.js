/* 
const swiper = new Swiper('.hero__swiper', {  
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  lazy: true,
  loop: true,
});

const swiper_lg = new Swiper('.hero__swiper_lg', {  
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  lazy: true,
  loop: true,
});
*/
 

/* 
    Table of Content
*/
/* 
  1. Home Page - Hero2 Mobile Swiper 
  2. Home Page - Hero2 Desktop Swiper  
  3. Home Page - Buy Section Product Swipers 
*/ 

// Define base configuration for Hero Swiper
const baseSwiperConfig = { 
  spaceBetween: 10,
  speed: 1200,
  // initialSlide: 1,
  autoplay: { delay: 3000 },
  loop: true,
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 1,
  loopedSlides: 2,
  updateOnWindowResize: true,
  pagination: {
    el: ".swiper-pagination",
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
      const elements = document.querySelectorAll('.hero .swiper-slide');
      elements.forEach((element) => {
        element.classList.add('hero_slider_loaded');
      });
    },
  },
};

// Define base configuration for Mobile Hero Swiper
// Inspired by https://codepen.io/kristen17/pen/ExpZXLz & i like this for the future: https://codepen.io/sandhya_subram/pen/KKVxWgd & https://codepen.io/shamim539/pen/vdaqQG
const baseHomePageMobileSwiperConfig = { 
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  allowTouchMove: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 5,
    stretch: 0,
    depth: 100,
    modifier: 1,
    // slideShadows: true
  },
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
    581: {
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
      const elements = document.querySelectorAll('.hero .swiper-slide');
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

// Define Swiper initialization functions
const initHero2MobileSwiper = () => new Swiper(".hero__swiper--sm", baseHomePageMobileSwiperConfig);
const initHero2DesktopSwiper = () => new Swiper(".hero__swiper--lg", baseSwiperConfig);

// Initialize hero Swipers immediately
let hero2MobileSwiper = initHero2MobileSwiper();
let hero2DesktopSwiper = initHero2DesktopSwiper(); 

// Wait for DOM content to load before initializing Swipers again
document.addEventListener('DOMContentLoaded', (event) => {
  hero2MobileSwiper = initHero2MobileSwiper();
  hero2DesktopSwiper = initHero2DesktopSwiper();
});
