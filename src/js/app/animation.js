import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';
import anime from 'animejs';


export default class Animation{
  constructor(){
    this.controller = new ScrollMagic.Controller();

    this.hoverSvg(this.drawSvg);
    this.animateLeftToRight(this.controller, this.drawSvg);
    this.animateRightToLeft(this.controller, this.drawSvg);
    this.animateBottomToTop(this.controller);
    this.animateFadeIn(this.controller);
  }

  drawSvg(element, time = 2000){
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
    return lineDrawing;
  }

  hoverSvg(draw){
    $('.animate-svg').hover(function(){
      let thisElement = $(this);
      draw(thisElement, 500).play();
    });
  }

  animateLeftToRight(controller, draw){
    $('.animate-to-right').each(function(){
      let t = $(this);
      let icon = t.find('.animate-svg');
      let animate = anime({
        targets: this,
        translateX: ['-100%', 0],
        opacity: [0,1],
        delay: 250,
        duration: 1000,
        easing: 'easeInOutQuart',
        autoplay: false,
        begin: function() {
          t.parent().css("overflow", "hidden");
        },
        complete: function() {
          t.parent().css("overflow", "visible");
        }
      });
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1
      })
      .addTo(controller)
      .on("progress", function () {
        draw(icon, 2000).play();
        animate.play();
      });
    });
  }

  animateRightToLeft(controller, draw){
    $('.animate-to-left').each(function(){
      let t = $(this);
      let icon = t.find('.animate-svg');
      let animate = anime({
        targets: this,
        translateX: ['100%', 0],
        opacity: [0,1],
        delay: 250,
        duration: 1000,
        easing: 'easeInOutQuart',
        autoplay: false,
        begin: function() {
          t.parent().css("overflow", "hidden");
        },
        complete: function() {
          t.parent().css("overflow", "visible");
        }
      });
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1
      })
      .addTo(controller)
      .on("progress", function () {
        draw(icon, 2000).play();
        animate.play();
      });
    });
  }

  animateBottomToTop(controller){
    $('.animate-to-top').each(function(){

      let t = $(this);
      let animate = anime({
        targets: this,
        translateY: ['100%', 0],
        opacity: [0,1],
        delay: 250,
        duration: 1000,
        easing: 'easeInOutQuart',
        autoplay: false,
        begin: function() {
          t.parent().css("overflow", "hidden");
        },
        complete: function() {
          t.parent().css("overflow", "visible");
        }
      });
      new ScrollMagic.Scene({
        triggerElement: this.parentNode,
        triggerHook: 1
      })
      .addTo(controller)
      .on("progress", function () {
        animate.play();
      });
    });
  }

  animateFadeIn(controller){
    $('.animate-fade-in').each(function(){
      let animate = anime({
        targets: this,
        opacity: [0,1],
        delay: 250,
        duration: 1000,
        easing: 'linear',
        autoplay: false
      });
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1
      })
      .addTo(controller)
      .on("progress", function () {
        animate.play();
      });
    });
  }

}