import $ from 'jquery';
class Preloader{
    constructor(){
        this.onready = document.addEventListener("DOMContentLoaded", this.ready );
    }

    ready(){
        if($('.preloader').length > 0){
            $(".preloader").delay(2000).fadeOut(500);
            $('.loader').delay(1000).fadeOut(500, function(){
                $('body').addClass('loaded');
            });
        }
    }
}

new Preloader();