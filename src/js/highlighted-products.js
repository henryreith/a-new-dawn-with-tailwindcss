import Swiper from 'swiper';

import { Navigation } from 'swiper/modules';

// Configuration for the highlighted products Swiper slider
const HighlightedProductsSwiperConfig = {
  modules: [Navigation],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    lazy: true,
    loop: true,
};

// Initializes the Swiper slider for highlighted products
const initHighlightedProductsSwiper = () => {
  return new Swiper(".highlighted-products__swiper", HighlightedProductsSwiperConfig);
};

// Wait for the DOM to fully load before initializing the Swiper slider
document.addEventListener('DOMContentLoaded', () => {
  const highlightedProductsSwiper = initHighlightedProductsSwiper();
});