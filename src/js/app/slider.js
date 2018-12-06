import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function slider() {
  if( $('.js-slider').length > 0 ){

    let titles = [];
    let themes = [];
    $('.js-slider .swiper-slide').each(function() {
      titles.push($(this).data('title'));
      themes.push($(this).data('theme'));
    });
    // console.log(themes);
    var slider = new Swiper('.js-slider', {
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
          var index = this.activeIndex;
          var getTheme = themes[index - 1];
          if(getTheme){
            // console.log(getTheme);
            $('body').addClass('slider--theme-light');
          }else{
            $('body').removeClass('slider--theme-light');
            // console.log('false');
          }
        },
      }
    });
    slider.on('slideChange', function () {
      var index = this.activeIndex;
      var getTheme = themes[index - 1];
      if(getTheme){
        // console.log(getTheme);
        $('body').addClass('slider--theme-light');
      }else{
        $('body').removeClass('slider--theme-light');
        // console.log('false');
      }
      
    });

    return slider;
  }else{
    return false
  }

}

module.exports = slider;