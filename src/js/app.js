import './vendor';
import $ from 'jquery';
import Swiper from 'swiper';
import maskInput from 'vanilla-text-mask';

$(document).ready(function(){
  let inputTel = document.querySelector('.tel');

  if (inputTel != null) {
    const phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    maskInput({
      inputElement: inputTel,
      mask: phoneMask,
      keepCharPositions: true,
      showMask: true
    });

  }

  function slider(){
    return new Swiper('.js-slider', {
      spaceBetween: 0,
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.js-slider-pagination',
      },
    });
  }
  slider();

  // $('.scrollbar-macosx').scrollbar();
});

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll > 300) {
    $("body").addClass("header--fixed");
  }
  else {
    $("body").removeClass("header--fixed");
  }
});