import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function slider() {
  if( $('.js-slider').length > 0 ){

    let titles = [];
    let themes = [];
    let videos = [];
    let videoFallbackImage = [];

    $('.js-slider .swiper-slide').each(function() {
      titles.push($(this).data('title'));
      ( $(this).data('theme') ? themes.push($(this).data('theme')) : themes.push('') );
      ( $(this).data('video') ? videos.push($(this).data('video')) : videos.push('') );
      ( $(this).data('videofallbackimage') ? videoFallbackImage.push($(this).data('videofallbackimage')) : videoFallbackImage.push('') );
    });

    let slider = new Swiper('.js-slider', {
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
          if(getTheme){
            $('body').addClass('slider--theme-light');
          }else{
            $('body').removeClass('slider--theme-light');
          }
        },
      }
    });
    slider.on('slideChange', function () {
      let index = this.activeIndex;
      let getTheme = themes[index - 1];
      let hasVideo = videos[index - 1];
      if(getTheme){
        $('body').addClass('slider--theme-light');
      }else{
        $('body').removeClass('slider--theme-light');
      }
      if(hasVideo){
        let player = $("#vimeoVideo-" + (index) ).vimeo_player({
          mobileFallbackImage: videoFallbackImage[index]
        });
      }
    });

    return slider;
  }else{
    return false
  }

}

module.exports = slider;