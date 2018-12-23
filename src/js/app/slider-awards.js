import Swiper from 'swiper/dist/js/swiper.js';

export default class SliderAwards{
  constructor(selector){
    this.slider = new Swiper( selector , {
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
}