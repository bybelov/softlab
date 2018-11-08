import {
  TweenLite
} from "gsap/TweenMax";
import $ from 'jquery';
import 'animation.gsap';
import 'debug.addIndicators';

function popup() {
  // popup window animation
  $('.js-hamburger').on('click', function (e) {
    e.preventDefault();
    TweenLite.fromTo(".popup", .4, {
        display: "none",
        opacity: 0
      }, {
        display: "block",
        opacity: 1
      }),
      TweenLite.fromTo(".popup__inner", .4, {
        autoAlpha: 0,
        x: "-64px",
        scaleX: 0,
        transformOrigin: "left"
      }, {
        autoAlpha: 1,
        x: "0px",
        scale: 1,
        delay: .4,
        ease: "Power2.easeInOut",
        onComplete: function () {
          $('body').addClass('popup-open');
          $('.popup').addClass('show');
        }
      });
  });

  $('.js-popup-close').on('click', function (e) {
    e.preventDefault();
    TweenLite.fromTo(".popup__inner", .4, {
        transformOrigin: "right"
      }, {
        autoAlpha: 0,
        scaleX: 0,
        delay: .5,
        ease: "Power1.easeIn",
        onComplete: function () {
          $('body').removeClass('popup-open');
          $('.popup').removeClass('show');
        }
      }),
      TweenLite.to(".popup", .4, {
        opacity: 0,
        delay: .9
      }),
      TweenLite.to(".popup", 0, {
        display: "none",
        delay: 1.2
      });
  });
}

module.exports = popup;