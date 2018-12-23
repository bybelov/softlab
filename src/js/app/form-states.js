import $ from 'jquery';

export default class FormClassStates{
  constructor(){

    this.classes();
    this.textarea = $('textarea').on('keydown', this.textareaAutoSize);
  }

  classes(){
    $('input, textarea').on('blur change keyup paste input', function () {
      var self = $(this);
      if (self.val() === '') {
        if (!self.is(':focus')) {
          self.closest('.form-group').removeClass('active');
        }
      } else {
        self.closest('.form-group').addClass('active');
      }
    });
    $('input, textarea').on('focus active', function () {
      $(this).closest('.form-group').addClass('focus active');
    });
    $('input, textarea').on('blur', function () {
      $(this).closest('.form-group').removeClass('focus');
    });
  }

  textareaAutoSize(){
    let el = this;
    setTimeout(function () {
      el.style.cssText = 'height:auto; padding: 0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }

}