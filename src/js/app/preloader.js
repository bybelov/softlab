import $ from 'jquery';

function preloader() {
    
    $(".preloader").delay(4000).fadeOut(1000);
    $('.loader').delay(2000).fadeOut(500);
    
}

module.exports = preloader;