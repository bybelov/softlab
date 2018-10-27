import './vendor';
import $ from 'jquery';
import maskInput from 'vanilla-text-mask';

window.onload = function () {

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

  // $('.scrollbar-macosx').scrollbar();

}

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll > 300) {
    $("body").addClass("header--fixed");
  }
  else {
    $("body").removeClass("header--fixed");
  }
});