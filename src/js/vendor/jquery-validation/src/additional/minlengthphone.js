// Checking the phone number for the minimum length
$.validator.addMethod('minlengthphone', function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
  },
  'Введите корректный номер телефона'
);

$.validator.addMethod('requiredphone', function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
  },
  'Укажите номер телефона'
);