import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import Metaballs from './metaballs';


// if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches || window.matchMedia('(min-resolution: 192dpi)').matches) {
//   var retina = true;
// }

let resize = function (el, index, width, height){

  let ratio = 1;
  // if(retina === true){
    // ratio = 1.5;
  // }
  
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
    // console.log(width, height);

    if(startScreenX && startScreenY){

      maxWidth = startScreenX;
      maxHeight = startScreenY;

      if (window.matchMedia("(orientation: portrait)").matches) {
        ratio =  width / maxWidth * 1.6;
      }else{
        ratio =  height / maxHeight;
      }

      let ratioWH = width/height;
      if(  ratioWH < 1.6 && ratioWH >= 0.976){
        ratio = ratio * ratioWH * 0.6;
      }
      else if( ratioWH < 0.55){
        ratio = ratio * ratioWH * 2.8;
      }

    }else{
      console.log('Attributes data-swiper-screen-x, data-swiper-screen-y is empty!');
    }

    if(sl.length > 0){

      // ratio = ratio * 5.3;

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
    let videos = new Array();

    this.meta = new Metaballs('container');

    this.createArray(titles, themes, videos, selector);

    this.slider = new Swiper( selector, {
      parallax:true,
      spaceBetween: 0,
      preloadImages: false,
      loop: false,
      lazy: {
        loadPrevNext: true,
      },
      slidesPerView: 1,
      watchSlidesVisibility: true,
      effect: 'fade',
      // mousewheel: {
      //   releaseOnEdges: true
      // },
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

          let getVideo = videos[index];
          if(getVideo){
            let instance = slides.slides[index].getElementsByClassName('slider__item')[0];
            let instanceObj = $(instance).data('vide').getVideoObject();
            let play = instanceObj.play();
          }else{
            $('.slider__item').each(function () {
              if($(this).data('vide')){
                $(this).data('vide').getVideoObject().pause();
              }
            });
          }

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

      let getVideo = videos[index];
      if(getVideo){
        let instance = slides.slides[index].getElementsByClassName('slider__item')[0];
        let instanceObj = $(instance).data('vide').getVideoObject();
        let play = instanceObj.play();
      }else{
        $('.slider__item').each(function () {
          if($(this).data('vide')){
            $(this).data('vide').getVideoObject().pause();
          }
        });
      }
    });

  }

  createArray(titles, themes, videos, selector){
    $(selector + ' .swiper-slide').each(function() {
      let title = $(this).data('title');
      let theme = $(this).data('theme');
      let video = $(this).data("video");

      (title ? title : 'слайд');
      (theme ? theme : '');
      (video ? video : '');
      titles.push(title);
      themes.push(theme);
      videos.push(video);
    });
  }

}

$(document).ready(function(){
  new Slider('.js-slider', resize);
});