import {TweenMax, EasePack } from "gsap/TweenMax";
import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

function animation(){

  var controller = new ScrollMagic.Controller();

  // animate from left to right
  $('.animate-to-right').each(function(){
    var tween = TweenMax.staggerTo( $(this), 1, {
      x: 0,
      ease: Quart.easeInOut,
      delay: 0
    }, 0.25);
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    });
    scene.setTween(tween)
    // .setClassToggle(this, 'reveal')
    // .addIndicators({name: "service "})
    .addTo(controller);
  });
  
  // animate-to-top
  $('.animate-to-top').each(function(){
    var tween = TweenMax.staggerTo( $(this), 1, {
      y: 0,
      ease: Power2.easeInOut,
      delay: 0
    }, 0.5);
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    });
    scene.setTween(tween)
    // .addIndicators({name: "text "})
    .addTo(controller);
  });

  // animate-fade-in
  $('.animate-fade-in').each(function(){
    var tween = TweenMax.from(this, 1, {
      y: 40,
      autoAlpha: 0,
      delay: 0,
      ease: Power2.easeOut
    }, .25);
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    });
    scene.setTween(tween)
    // .addIndicators({name: "opacity "})
    .addTo(controller);

  });

}

module.exports = animation;