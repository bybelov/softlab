import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function sliderPhones() {
  var swiperSlider = new Swiper('.js-phone-screens', {


    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    speed: 400,
    effect: 'slide',
    slidesOffsetBefore: 0,
    spaceBetween: 0,
    centeredSlides: true,
    roundLengths: true,
    loop: true,

    slidesPerView: 5,
    spaceBetween: 0,
    breakpoints: {
      400: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }

  });

  var nbSlides = swiperSlider.params.slidesPerView;
      swiperSlider.slideTo(Math.floor(nbSlides / 2));
  
  $('.js-phone-screens .swiper-slide').on('click', function(e){
    e.preventDefault();
    // console.log($(this).index());
    swiperSlider.slideTo($(this).index());
    return false;
  });

  return swiperSlider;

}
module.exports = sliderPhones;