import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import Metaballs from './metaballs-new';
export default class Slider{
  constructor(selector){

    let titles = new Array();
    let themes = new Array();
    this.meta = new Metaballs('container');

    this.createArray(titles, themes, selector);

    this.slider = new Swiper( selector , {
      parallax:true,
      spaceBetween: 0,
      loop: false,
      slidesPerView: 1,
      effect: 'fade',
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
          // let getTheme = themes[index - 1];
          let getTheme = themes[index];
          (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));
        },
      }
    });

    this.slideChange(themes);
    this.resize();
  
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

  slideChange(themes){
    this.slider.on('slideChange', function () {
      // console.log(balls.meta);
      // balls.meta.matrixAutoUpdate  = false;
      // balls.meta.updateMatrix();

      let index = this.activeIndex;
      // let getTheme = themes[index - 1];
      let getTheme = themes[index];
      (getTheme ? $('body').addClass('slider--theme-light') : $('body').removeClass('slider--theme-light'));
    });
  }

  resize(){
    this.slider.on('resize', function(){
      let ratio = 0;
      let maxWidth = 1903;
      let maxHeight = 969;

      let currentWidth,
          currentHeight;

      let index = this.activeIndex;
      let width = this.width;
      let height = this.height;
      let sl = this.slides[index].getElementsByClassName('sl');
      if(sl.length > 0){

        if(width < maxWidth){
          ratio =  width / maxWidth

          currentWidth = maxWidth * ratio;
          currentHeight = maxHeight * ratio;

        }
        if(height < maxHeight){
          ratio =  height / maxHeight; // get ratio for scaling image
          
          currentWidth = maxWidth * ratio;
          currentHeight = maxHeight * ratio;
        }

        console.log("currentWidth = " + currentWidth + 
                    "/ currentHeight = " + currentHeight,
                    " width = " + width + " height = " + height + " / " + 
                    " scale = " + ratio );
        

        // let max = Math.max(width, height);

        // if(width > height){
        //   scale = scale * K / (width/height);
        // }
        // else{
        //   scale = scale * (width/height) / K;
        // }

        let styles = sl[0].style;
        styles.transform = "scale(" + ratio + ")";
        // styles.right = "-" + translateX + "px";

        // console.log(styles);
        // console.log(scale);
      }
      // let sl = this.find('.slider__bg .sl');

    })
  }

}