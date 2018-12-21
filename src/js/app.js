import './vendor';
import $ from 'jquery';
// import Tabs from './app/tabs';
import Slide from './app/slider';
// import Awards from './app/slider-awards';
// import Phones from './app/slider-phones';
// import Popup from './app/popup';
// import Animation from './app/animation';
// import Scroll from './app/scrollbar';
// import HeaderSticky from './app/header-sticky';
// import FormStates from './app/form-states';
// import FormFile from './app/input-file';
// import Preloader from './app/preloader';
// import VH from './app/polifill-vh';
import './app/metaballs.js';

// import './app/customballs';



$(document).ready(function () {

  // VH();
  // Preloader();
  // Scroll();
  // HeaderSticky();
  // Animation();
  // Tabs();
  // Popup();
  // FormStates();
  // FormFile(document, window, 0);
  new Slide();


  // Phones();
  // Awards();



  $('[data-scrollto]').click(function(){
    $.scrollTo( $(this).attr('data-scrollto'), 1000);
  });
  

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});


