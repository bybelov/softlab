import './vendor';
import $ from 'jquery';
import Tabs from './app/tabs';
import Slider from './app/slider';
import Popup from './app/popup';
import Animation from './app/animation';
import Scroll from './app/scrollbar';
import HeaderSticky from './app/header-sticky';
import FormStates from './app/form-states';
import Preloader from './app/preloader';
import VH from './app/polifill-vh';
import './app/metaballs';
// import './app/customballs';

$(document).ready(function () {

  VH();
  Preloader();
  Scroll();
  HeaderSticky();
  Animation();
  Tabs();
  Popup();
  FormStates();
  Slider();

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});


