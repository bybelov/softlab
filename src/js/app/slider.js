import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import Metaballs from './metaballs';


if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches || window.matchMedia('(min-resolution: 192dpi)').matches) {
  var retina = true;
}

let resize = function (el, index, width, height){

  let ratio = 1;
  if(retina === true){
    // ratio = 1.5;
  }
  
  let maxWidth, maxHeight;      
  // let screenX = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  // let screenY = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

  let sliderWrapperBg = el.slides[index].getElementsByClassName('slider__bg');
  let sl = el.slides[index].getElementsByClassName('sl');

  if(sliderWrapperBg.length > 0){

    let startScreenX = sliderWrapperBg[0].getAttribute("data-swiper-screen-x");
    let startScreenY = sliderWrapperBg[0].getAttribute("data-swiper-screen-y");
    // console.log(startScreenX, startScreenY);
    // console.log(screenX, screenY);
    console.log(width, height);

    if(startScreenX && startScreenY){
      maxWidth = startScreenX;
      maxHeight = startScreenY;

      // if(width <= maxWidth){
      //   ratio = width / maxWidth * 1.5;
      // }

      // if(height <= maxHeight){
        ratio =  height / maxHeight;
      // }

      // console.log(ratio);
    }else{
      console.log('Attributes data-swiper-screen-x, data-swiper-screen-y is empty!');
    }

    if(sl.length > 0){

      for(let i = 0; i < sl.length; i++){

        let right = sl[i].getAttribute("data-swiper-right");
        let top = sl[i].getAttribute("data-swiper-top");

        let zIndex = sl[i].getAttribute("data-swiper-zIndex");

        let styles = sl[i].style;
            styles.right = right * ratio + 'px';
            styles.top = top * ratio + 'px';
            styles.zIndex = zIndex;

        let imgWidth = sl[i].children[0].naturalWidth;
        let imgHeight = sl[i].children[0].naturalHeight;

        styles.width = imgWidth * ratio + 'px';
        styles.height = imgHeight * ratio + 'px';

        // console.log("img = " + imgWidth, imgHeight);
        // console.log("position (right, top) = " + right, top);
      }
      // console.log(sl);
    }
  }
}

class Slider{
  constructor(selector, resize){

    let titles = new Array();
    let themes = new Array();
    this.meta = new Metaballs('container');

    this.createArray(titles, themes, selector);

    this.slider = new Swiper( selector, {
      parallax:true,
      spaceBetween: 0,
      loop: false,
      slidesPerView: 1,
      effect: 'fade',
      mousewheel: {
        releaseOnEdges: true
      },
      pagination: {
        el: '.js-slider-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + titles[index] + '</span></div>';
        },
      },
      on: {
        init: function () {
          let index = this.activeIndex;
          let width = this.width;
          let height = this.height;
          let slides = this;
          // let getTheme = themes[index - 1];
          let getTheme = themes[index];
          (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));

          resize(slides, index, width, height);
          
        },
      }
    });

    this.slider.on('resize', function(){
      let index = this.activeIndex;
      let width = this.width;
      let height = this.height;
      let slides = this;
      resize(slides, index, width, height);
    });

    this.slider.on('slideChange', function () {
      // console.log(balls.meta);
      // balls.meta.matrixAutoUpdate  = false;
      // balls.meta.updateMatrix();

      let index = this.activeIndex;
      let width = this.width;
      let height = this.height;
      let slides = this;
      resize(slides, index, width, height);

      // let getTheme = themes[index - 1];
      let getTheme = themes[index];
      (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));
    });

  }

  createArray(titles, themes, selector){
    $(selector + ' .swiper-slide').each(function() {
      let title = $(this).data('title');
      let theme = $(this).data('theme');
      (title ? title : 'слайд');
      (theme ? theme : '');
      titles.push(title);
      themes.push(theme);
    });
  }

}

$(document).ready(function(){
  new Slider('.js-slider', resize);
});