import ScrollMagic from 'ScrollMagic';

// header sticky
function HeaderSticky(){

  const content = document.querySelector(".main__content");
  const body = document.querySelector("body");

  if(!body.classList.contains('header--sticky')){
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: content,
      triggerHook: 0,
      offset: 0
    }).setClassToggle(body, 'header--sticky')
//  .addIndicators({name: "header"})
    .addTo(controller);
  }


}

module.exports = HeaderSticky;