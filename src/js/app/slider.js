import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';

function slider() {
  let titles = [];
  $('.js-slider .swiper-slide').each(function() {
    titles.push($(this).data('title'))
  });
  return new Swiper('.js-slider', {
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
  });
}

module.exports = slider;