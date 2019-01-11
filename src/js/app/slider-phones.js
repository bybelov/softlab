import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

export default class SliderPhone{
  constructor(selector){

    this.width;
    let sliderMask = $( selector + ' .carousel__mask');
    this.slider = new Swiper(selector, {

      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
      speed: 400,
      effect: 'slide',
      slidesOffsetBefore: 0,
      spaceBetween: 0,
      centeredSlides: true,
      roundLengths: true,
      loop: true,
      slidesPerView: 6,
      spaceBetween: 0,
      breakpoints: {
        576: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        },
        2048: {
          slidesPerView: 5
        }
      },
      on: {
        init: function () {
          this.width = this.slidesSizesGrid[0];
          sliderMask.width(this.width);

          this.slideTo(Math.floor( this.params.slidesPerView / 2 ));
        },
        resize: function () {
          this.width = this.slidesSizesGrid[0];
          sliderMask.width(this.width);
        }
      }
    });
  
    this.next(this.slider, selector);

  }

  next(slider, selector){
    $(selector + ' .swiper-slide').on('click', function(e){
      e.preventDefault();
      slider.slideTo($(this).index());
      return false;
    });
  }

}