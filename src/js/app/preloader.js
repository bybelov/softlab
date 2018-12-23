import $ from 'jquery';

export default class Preloader{
    constructor(){
        this.preloader = $(".preloader").delay(4000).fadeOut(1000);
        this.loader = $('.loader').delay(2000).fadeOut(500);
    }
}