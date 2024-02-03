// import Swiper JS
import Swiper from './swiper-bundle.min.js';

const swiper = new Swiper('.highlighted-products__swiper', { 
    // configure Swiper to use modules
    modules: Navigation,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    lazy: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  });