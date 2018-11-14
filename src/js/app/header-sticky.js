import ScrollMagic from 'ScrollMagic';

// header sticky
function HeaderSticky(){

  const content = document.querySelector(".main__content");
  const body = document.querySelector("body");

  const controller = new ScrollMagic.Controller();
  const scene = new ScrollMagic.Scene({
                  triggerElement: content,
                  triggerHook: 0,
                  offset: 0
                })
        scene.setClassToggle(body, 'header--sticky')
              // .addIndicators({name: "header"})
              .addTo(controller);
}

module.exports = HeaderSticky;