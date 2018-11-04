import './vendor';
import $ from 'jquery';
import Swiper from 'swiper';
import './vendor/tabs';


$(document).ready(function () {

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

  // states for input, textarea
  $('input, textarea').on('blur change keyup paste input', function () {
    var self = $(this);
    if (self.val() === '') {
      if (!self.is(':focus')) {
        self.closest('.form-group').removeClass('active');
      }
    } else {
      self.closest('.form-group').addClass('active');
    }
  });
  $('input, textarea').on('focus active', function () {
    $(this).closest('.form-group').addClass('focus active');
  });
  $('input, textarea').on('blur', function () {
    $(this).closest('.form-group').removeClass('focus');
  });

  // auto resize textarea
  function autosize(){
    let el = this;
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding: 0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
  }
  let textarea = document.querySelector('textarea');
  textarea.addEventListener('keydown', autosize);

  // popup show
  $('.js-hamburger').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('popup-open');
    $('.popup').toggleClass('show');
  });
  $('.js-popup-close').on('click', function(e) {
    e.preventDefault();
    $('body').removeClass('popup-open');
    $('.popup').toggleClass('show');
  });

  // slider
  function slider() {
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

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 300) {
    $("body").addClass("header--fixed");
  } else {
    $("body").removeClass("header--fixed");
  }
});