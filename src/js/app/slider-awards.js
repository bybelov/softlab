import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function slider() {
  if( $('.js-awards').length > 0 ){
    var slider = new Swiper('.js-awards', {
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
    return slider;
  } else{
    return false;
  }

}
module.exports = slider;