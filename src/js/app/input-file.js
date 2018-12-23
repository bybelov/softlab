import $ from 'jquery';

export default class customInputFile{
  constructor(selector){
    this.custom(selector);
  }

  custom(selector){
    $(selector).each(function(){

      let elFileName = $(this).parent().parent().find('.file-name');
  
      $(this).on('change', function (e) {
  
        let fileName = '';
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        }
        
        (fileName ? elFileName.val(fileName) : elFileName.val(""));
  
      });
    });
  }

}