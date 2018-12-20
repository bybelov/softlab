import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';
import anime from 'animejs';

function animation(){

  let controller = new ScrollMagic.Controller();

  // draw svg icon
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
    return lineDrawing;
  }

  // hover animation
  $('.animate-svg').hover(function(){
    let thisElement = $(this);
    drawSvg(thisElement, 500).play();
  }, function(){

  });

  // animate left ro right
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
      begin: function(anim) {
        t.parent().css("overflow", "hidden");
      },
      complete: function(anim) {
        t.parent().css("overflow", "visible");
      }
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    })
    .addTo(controller)
    .on("progress", function (event) {
      drawSvg(icon, 2000).play();
      animate.play();
    });
  });


  // animate bottom to top
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
      begin: function(anim) {
        t.parent().css("overflow", "hidden");
      },
      complete: function(anim) {
        t.parent().css("overflow", "visible");
      }
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: this.parentNode,
      triggerHook: 1
    })
    .addTo(controller)
    .on("progress", function (event) {
      animate.play();
    });
  });

  // animate-fade-in
  $('.animate-fade-in').each(function(){
    let t = $(this);
    let animate = anime({
      targets: this,
      opacity: [0,1],
      delay: 250,
      duration: 1000,
      easing: 'linear',
      autoplay: false
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1
    })
    .addTo(controller)
    .on("progress", function (event) {
      animate.play();
    });
  });


  $('.animate-angle-left-to-right').each(function(){
    let t = $(this);
    let animate = anime({
      targets: this,
      delay: 3000,
      duration: 2000,
      easing: 'linear',
      translateX: [t.data('x') * -100 + '%', t.data('x') + '%'],
      translateY: [t.data('y') * 3 + '%', t.data('y') + '%'],
      loop: false,
      // direction: 'reverse',
      autoplay: true
    });
    console.log(t.data('x'), t.data('y'));
  });

}

module.exports = animation;