import Swiper from '../node_modules/swiper/swiper';
const swiper = new Swiper('.highlighted-products__swiper', { 
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
