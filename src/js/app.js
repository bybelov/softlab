import './vendor';
import $ from 'jquery';
import Tabs from './app/tabs';
import Slider from './app/slider';
import Popup from './app/popup';
import Animation from './app/animation';
import Scroll from './app/scrollbar';
import FormStates from './app/form-states';


$(document).ready(function () {

  Scroll();
  Animation();
  Tabs();
  Popup();
  FormStates();
  Slider();
  

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});