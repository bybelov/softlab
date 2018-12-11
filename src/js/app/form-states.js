import $ from 'jquery';

function addFocusActivetoForm() {
  // states for input, textarea
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

  // auto resize textarea
  function autosize() {
    let el = this;
    setTimeout(function () {
      el.style.cssText = 'height:auto; padding: 0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }
  let textarea = $('textarea');
  if(textarea.length > 0){
    textarea.on('keydown', autosize);
  }

}

module.exports = addFocusActivetoForm;