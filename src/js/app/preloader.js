import $ from 'jquery';
class Preloader{
    constructor(){
        this.onready = document.addEventListener("DOMContentLoaded", this.ready );
    }

    ready(){
        $(".preloader").delay(3500).fadeOut(1000);
        $('.loader').delay(2000).fadeOut(500, function(){
            $('body').addClass('loaded');
        });
        
    }
}

new Preloader();