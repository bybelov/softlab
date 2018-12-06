import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function slider() {


  if($('.js-phone-screens').length > 0 ){

    var slider = new Swiper('.js-phone-screens', {

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
  
    var nbSlides = slider.params.slidesPerView;
        slider.slideTo(Math.floor(nbSlides / 2));
    
    $('.js-phone-screens .swiper-slide').on('click', function(e){
      e.preventDefault();
      // console.log($(this).index());
      slider.slideTo($(this).index());
      return false;
    });

    return slider;

  } else{
    return false;
  }

}
module.exports = slider;