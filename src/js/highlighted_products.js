// Wait for DOM content to load before initializing Swipers again
document.addEventListener('DOMContentLoaded', (event) => {
  const swiper = new Swiper('.highlighted-products__swiper', {  
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    lazy: true,
    loop: true,
  });
});