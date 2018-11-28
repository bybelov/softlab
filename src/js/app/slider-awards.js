import Swiper from 'swiper/dist/js/swiper.js';

function slider() {
  return new Swiper('.js-awards', {
    slidesPerView: 5,
    spaceBetween: 0,
    breakpoints: {
      400: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}
module.exports = slider;