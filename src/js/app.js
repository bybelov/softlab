import './vendor';
import $ from 'jquery';
import Tabs from './app/tabs';
import HeaderSticky from './app/header-sticky';
import SliderAwards from './app/slider-awards';
import SliderPhones from './app/slider-phones';
import Popup from './app/popup';
import Animation from './app/animation';
import FormClassStates from './app/form-states';
import CustomInputFile from './app/input-file';
import PolifillVh from './app/polifill-vh';
import './app/slider';
import './app/preloader';
// import './app/meta';
import Metaballs from './app/metaballs/index';

$(document).ready(function () {

  new PolifillVh();
  new Animation();
  new Tabs();
  new Popup();
  new FormClassStates();
  new CustomInputFile('.file-input');
  new HeaderSticky();
  new SliderAwards('.js-awards');
  new SliderPhones('.js-phone-screens');
  new Metaballs('container').init();

  $('[data-scrollto]').click(function(){
    $.scrollTo( $(this).attr('data-scrollto'), 1000);
  });

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});


