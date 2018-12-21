import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import 'vide';

export default class Slide extends ${
  constructor(){
    super();
    this.titles = [];
    this.themes = [];
    this.eachSlide = $('.js-slider .swiper-slide').each(function() {
      
      this.titles.push($(this).data('title'));
      ( $(this).data('theme') ? this.themes.push($(this).data('theme')) : this.themes.push('') );

      console.log(this.titles);
    });
    this.slider = new Swiper('.js-slider', {
      spaceBetween: 0,
      loop: true,
      slidesPerView: 1,
      effect: 'slide',
      pagination: {
        el: '.js-slider-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + this.titles[index] + '</span></div>';
        },
      },
      on: {
        init: function () {
          let index = this.activeIndex;
          console.log(this);
          let getTheme = this.themes[index - 1];
          if(getTheme){
            $('body').addClass('slider--theme-light');
          }else{
            $('body').removeClass('slider--theme-light');
          }
        },
      }
    });

    this.slideChange();

  }


  slideChange(){
    this.slider.on('slideChange', function () {
      var index = this.activeIndex;
      let getTheme = this.themes[index - 1];
      if(getTheme){
        $('body').addClass('slider--theme-light');
      }else{
        $('body').removeClass('slider--theme-light');
      }
    });
  }

}

// function slider() {
//   if( $('.js-slider').length > 0 ){

//     let titles = [];
//     let themes = [];

//     $('.js-slider .swiper-slide').each(function() {
//       titles.push($(this).data('title'));
//       ( $(this).data('theme') ? themes.push($(this).data('theme')) : themes.push('') );
//     });

//     let slider = new Swiper('.js-slider', {
//       spaceBetween: 0,
//       loop: true,
//       slidesPerView: 1,
//       effect: 'slide',
//       pagination: {
//         el: '.js-slider-pagination',
//         clickable: true,
//         renderBullet: function (index, className) {
//           return '<div class="' + className + '"><span>' + titles[index] + '</span></div>';
//         },
//       },
//       on: {
//         init: function () {
//           let index = this.activeIndex;
//           let getTheme = themes[index - 1];
//           if(getTheme){
//             $('body').addClass('slider--theme-light');
//           }else{
//             $('body').removeClass('slider--theme-light');
//           }
//         },
//       }
//     });
//     slider.on('slideChange', function () {
//       var index = this.activeIndex;
//       let getTheme = themes[index - 1];
//       if(getTheme){
//         $('body').addClass('slider--theme-light');
//       }else{
//         $('body').removeClass('slider--theme-light');
//       }
//     });

//     return slider;
//   }else{
//     return false
//   }

// }

// module.exports = slider;