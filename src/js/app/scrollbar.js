import ScrollMagic from 'ScrollMagic';
import $ from 'jquery';

// pined sidebar
// body custom scrollbar
// fixed header

function scrollbar(){

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

  $("body").mCustomScrollbar({
    theme:"minimal-dark",
    autoExpandScrollbar: true,
    callbacks: {
      whileScrolling : function() {
        scene.refresh();
        var scrollTop = $('body').find("> .mCSB_scrollTools .mCSB_dragger").position().top;
        if (scrollTop > 10) {
          $("body").addClass("header--fixed");
        } else {
          $("body").removeClass("header--fixed");
        }
      }
    }
  });

}

module.exports = scrollbar;