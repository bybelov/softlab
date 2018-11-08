import $ from 'jquery';
import Swiper from 'swiper';

function slider() {
  let titles = [];
  $('.js-slider .swiper-slide').each(function() {
    titles.push($(this).data('title'))
  });
  return new Swiper('.js-slider', {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.js-slider-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="swiper-pagination-text ' + className + '">' + titles[index] + '</span>';
      },
    },
  });
}

module.exports = slider;