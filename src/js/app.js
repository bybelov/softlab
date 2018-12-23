import './vendor';
import $ from 'jquery';
import Tabs from './app/tabs';
import Slider from './app/slider';
import HeaderSticky from './app/header-sticky';
import SliderAwards from './app/slider-awards';
import SliderPhones from './app/slider-phones';
import Popup from './app/popup';
import Animation from './app/animation';
import FormClassStates from './app/form-states';
import CustomInputFile from './app/input-file';
import Preloader from './app/preloader';
import PolifillVh from './app/polifill-vh';
import './app/metaballs.js';

// import './app/customballs';



$(document).ready(function () {

  new PolifillVh();
  new Animation();
  new Preloader();
  new Tabs();
  new Popup();
  new FormClassStates();
  new CustomInputFile('.file-input');
  new HeaderSticky();
  new Slider('.js-slider');
  new SliderAwards('.js-awards');
  new SliderPhones('.js-phone-screens');


  $('[data-scrollto]').click(function(){
    $.scrollTo( $(this).attr('data-scrollto'), 1000);
  });
  

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});


