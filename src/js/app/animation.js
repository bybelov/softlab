import {TweenMax, EasePack } from "gsap/TweenMax";
import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';

// import Vivus from 'vivus';
import anime from 'animejs';

function animation(){

  let controller = new ScrollMagic.Controller();
  

  function drawSvg(element, time = 2000){
    // obj for array svg paths
    let obj = [];
    let paths = $(element).find('path');
    for (let n = 0; n < $(element).find('path').length; n++){
      obj[n] = paths[n];
    }
    // console.log(obj);
    let lineDrawing = anime({
      targets: obj,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInQuad',
      duration: time,
      delay: function(el, i) { 
        return (obj.length + 1)/(i + 1) * 250
      },
      direction: 'alternate',
      loop: false,
      autoplay: false
    });
    lineDrawing.play();
  }


  
  // hover animation
  $('.animate-svg').hover(function(){
    let thisElement = $(this);
    drawSvg(thisElement, 500)
  }, function(){

  });


  // animate from left to right
  $('.animate-to-right').each(function(){
    let thisElement = $(this);
    let icon = thisElement.find('.animate-svg');
    let tween = TweenMax.staggerFromTo( thisElement, 1, 
      {
        opacity: 0,
        xPercent: -100,
        ease: Quart.easeInOut,
        delay: 0.25
      },
      {
        opacity: 1,
        xPercent: 0,
        ease: Quart.easeInOut,
        delay: 0.25,
        onStart: function(){
          thisElement.parent().css("overflow", "hidden");
          drawSvg(icon, 2000)
        },
        onComplete: function(){
          thisElement.parent().css("overflow", "visible");
        }
      },
      0.25, 0 );
    let scene = new ScrollMagic.Scene({
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
    let tween = TweenMax.staggerFromTo( $(this), 1, 
    {
      yPercent: 100,
      ease: Power2.easeInOut,
      delay: 0
    },{
      yPercent: 0,
      ease: Power2.easeInOut,
      delay: 0
    }, 0.5);

    let scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    });

    scene.setTween(tween)
          // .addIndicators({name: "text "})
          .addTo(controller);
  });

  // animate-fade-in
  $('.animate-fade-in').each(function(){
    let tween = TweenMax.staggerFromTo($(this), 1, 
    {
      y: 200,
      autoAlpha: 0,
      delay: 0,
      ease: Power2.easeOut
    },{
      y: 0,
      autoAlpha: 1,
      delay: 0,
      ease: Power2.easeOut
    }, .25);

    let scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    });
    scene.setTween(tween)
          // .addIndicators({name: "opacity "})
          .addTo(controller);
  });

}

module.exports = animation;