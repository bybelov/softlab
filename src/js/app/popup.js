import $ from 'jquery';
import anime from 'animejs';


function popup() {

  function popupOpen(){

    $('.popup').addClass('show');
    
    anime({
      targets: '.popup',
      opacity: [0 , 1],
      translateX: ['-100%', 0],
      easing: 'easeInOutQuart',
      duration: 1000,
      delay: 250,
      loop: false
    });
    let animate = anime({
      targets: '.popup__inner',
      opacity: [0, 1],
      translateX: ['-100%', 0],
      easing: 'easeInOutQuart',
      duration: 1000,
      delay: 250,
      loop: false,
      complete: function(anim) {
        $('.popup').css('overflow','auto');
        $('body').addClass('popup-open');
        // $('.popup').addClass('show');
      }
    });
  }

  function popupClose(){
    $('.popup').css('overflow','hidden');
    
    anime({
      targets: '.popup',
      translateX: [0, '100%'],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 1000,
      delay: 250,
      loop: false,
    });
    let animate = anime({
      targets: '.popup__inner',
      opacity: 0,
      translateX: '100%',
      easing: 'easeInQuad',
      duration: 1000,
      delay: 250,
      loop: false,
      complete: function(anim) {
       
        $('body').removeClass('popup-open');
        $('.popup').removeClass('show');
      }
    });
  }

  // popup window animation
  $('.js-hamburger').on('click', function (e) {
    e.preventDefault();
    popupOpen();
  });

  $('.js-popup-close').on('click', function (e) {
    e.preventDefault();
    popupClose();
  });

  document.onkeydown = function(evt) {
    var evt = evt || window.event;
    if (evt.keyCode === 27) {
      popupClose();
    }
  };

}

module.exports = popup;