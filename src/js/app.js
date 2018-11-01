import './vendor';
import $ from 'jquery';
import Swiper from 'swiper';
import maskInput from 'vanilla-text-mask';

$(document).ready(function () {
  let inputTel = document.querySelector('.tel');

  if (inputTel != null) {

    const phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    inputTel.addEventListener('click', function(){
      maskInput({
        inputElement: inputTel,
        mask: phoneMask,
        keepCharPositions: true,
        showMask: true
      });
    });


  }

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