import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

export default class Slider{
  constructor(selector){

    let titles = new Array();
    let themes = new Array();

    this.createArray(titles, themes, selector);

    this.slider = new Swiper( selector , {
      spaceBetween: 0,
      loop: true,
      slidesPerView: 1,
      effect: 'slide',
      pagination: {
        el: '.js-slider-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + titles[index] + '</span></div>';
        },
      },
      on: {
        init: function () {
          let index = this.activeIndex;
          let getTheme = themes[index - 1];
          (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));
        },
      }
    });

    this.slideChange(themes);
  
  }

  createArray(titles, themes, selector){
    $(selector + ' .swiper-slide').each(function() {
      let title = $(this).data('title');
      let theme = $(this).data('theme');
      (title ? title : 'слайд');
      (theme ? theme : '');
      titles.push(title);
      themes.push(theme);
    });
  }

  slideChange(themes){
    this.slider.on('slideChange', function () {
      let index = this.activeIndex;
      let getTheme = themes[index - 1];
      (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));
    });
  }

}