import $ from 'jquery';

function customFile(document, window, index) {

  var inputs = $('.file-input');
  $.each(inputs, function(input){

    var input = $(this);
    var elFileName = input.parent().parent().find('.file-name');

    input.on('change', function (e) {

      var fileName = '';
      if (this.files && this.files.length > 1) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      } else {
        fileName = e.target.value.split('\\').pop();
      }

      if (fileName) {
        elFileName.val(fileName);
      } else {
        elFileName.val("");
      }

    });

  });

}

module.exports = customFile;