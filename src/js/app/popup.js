import $ from 'jquery';
import anime from 'animejs';


export default class Popup{
  constructor(){

    this.open(this.openPopup);
    this.close(this.closePopup);
    this.closeESC(this.closePopup);

  }

  open(event){
    $('.js-hamburger').on('click', function (e) {
      e.preventDefault();
      event();
    });
  }

  close(event){
    $('.js-popup-close').on('click', function (e) {
      e.preventDefault();
      event();
    });
  }

  closeESC(event){
    document.onkeydown = function(evt) {
      var evt = evt || window.event;
      if (evt.keyCode === 27) {
        event();
      }
    };
  }

  openPopup(){
    $('.popup').addClass('show');
    $('html').css('overflow', 'hidden');
    anime({
      targets: '.popup',
      opacity: [0 , 1],
      translateX: ['-100%', 0],
      easing: 'easeInOutQuart',
      duration: 1000,
      delay: 250,
      loop: false
    });
     anime({
      targets: '.popup__inner',
      opacity: [0, 1],
      translateX: ['-100%', 0],
      easing: 'easeInOutQuart',
      duration: 1000,
      delay: 250,
      loop: false,
      complete: function() {
        $('.popup').css('overflow','auto');
        $('body').addClass('popup-open');
      }
    });
  }

  closePopup(){
    $('.popup').css('overflow','hidden');
    $('html').css('overflow', 'auto');
    anime({
      targets: '.popup',
      translateX: [0, '100%'],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 1000,
      delay: 250,
      loop: false,
    });
    anime({
      targets: '.popup__inner',
      opacity: 0,
      translateX: '100%',
      easing: 'easeInQuad',
      duration: 1000,
      delay: 250,
      loop: false,
      complete: function() {
        $('body').removeClass('popup-open');
        $('.popup').removeClass('show');
      }
    });
  }

}