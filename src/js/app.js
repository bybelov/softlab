import './vendor';
import $ from 'jquery';
import Tabs from './app/tabs';
import Slider from './app/slider';
import Popup from './app/popup';
import Animation from './app/animation';
import Sidebar from './app/sidebar';
import FormStates from './app/form-states';


$(document).ready(function () {

  Slider();
  Tabs();
  Popup();
  Animation();
  Sidebar();
  FormStates();

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 40) {
    $("body").addClass("header--fixed");
  } else {
    $("body").removeClass("header--fixed");
  }
});