import ScrollMagic from 'ScrollMagic';

export default class HeaderSticky{
  constructor(){
    this.content = document.querySelector(".main__content");
    this.body = document.querySelector("body");
    this.sticky();
  }

  sticky(){
    if(!this.body.classList.contains('header--sticky')){
      let controller = new ScrollMagic.Controller();
      new ScrollMagic.Scene({
        triggerElement: this.content,
        triggerHook: 0,
        offset: 0
      }).setClassToggle( this.body, 'header--sticky')
      .addTo(controller);
    }
  }

}