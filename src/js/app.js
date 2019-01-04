import './vendor';
import $ from 'jquery';
import Init from './app/init';
import './app/slider';

$(document).ready(function () {

  new Init();

  $('[data-scrollto]').click(function(){
    $.scrollTo( $(this).attr('data-scrollto'), 1000);
  });

  // phone mask
  $(".tel").mask("+7 (999) 999-99-99");

});


