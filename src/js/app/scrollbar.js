import ScrollMagic from 'ScrollMagic';

// pined sidebar
// body custom scrollbar
function Scroll(){

  const content = document.querySelector(".content");
  const sidebar = document.querySelector(".sidebar");
  const controller = new ScrollMagic.Controller();
  const scene = new ScrollMagic.Scene({
    triggerElement: sidebar,
    triggerHook: 0,
    offset: -140,
    duration: getDuration
  }).addTo(controller);
  if (window.matchMedia("(min-width: 1200px)").matches) {
    scene.setPin(sidebar, {
      pushFollowers: false
    });
  }
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      scene.setPin(sidebar, {
        pushFollowers: false
      });
    } else {
      scene.removePin(sidebar, true);
    }
  });

  function getDuration() {
    return content.offsetHeight - sidebar.offsetHeight;
  }

}

module.exports = Scroll;