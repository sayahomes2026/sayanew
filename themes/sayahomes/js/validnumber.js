var input = document.querySelector("#phone, #phone1, #enq_phone"),
  errorMsg = document.querySelector("#phone_error, #enq_phone_error"),
  validMsg = document.querySelector("#valid-msg, #valid-msg1");

var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

var iti = window.intlTelInput(input, {
  utilsScript: "js/utils.js",
  initialCountry: "IN",
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

var isPhoneValid = function(itiInstance) {
  if (!itiInstance) return false;
  
  var countryData = itiInstance.getSelectedCountryData();
  var number = itiInstance.getNumber(window.intlTelInputUtils.numberFormat.E164);
  var nationalNumber = number.replace('+' + countryData.dialCode, '');
  
  // GCC countries accept 8-9 digits
  if (['ae', 'qa', 'om', 'bh', 'kw', 'sa'].includes(countryData.iso2)) {
    return nationalNumber.length >= 8 && nationalNumber.length <= 9;
  }
  
  return itiInstance.isValidNumber();
};

var validPhone = false;
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    var currentIti = window.intlTelInputGlobals.getInstance(input);
    if (isPhoneValid(currentIti)) {
      validPhone = true;
      validMsg.classList.remove("hide");
    } else {
      validPhone = false;
      input.classList.add("error");
      var errorCode = currentIti ? currentIti.getValidationError() : 0;
      errorMsg.innerHTML = errorMap[errorCode] || "Invalid number";
      errorMsg.classList.remove("hide");
    }
  }
});

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);
var telInput = $('#phone, #phone1, #enq_phone');

var validate = function(input) {
  if ($.trim(input.val())) {
    var currentIti = window.intlTelInputGlobals.getInstance(input[0]);
    if (isPhoneValid(currentIti)) {
      validMsg.classList.remove("hide");
    } else {
      return false;
    }
  }
};

$("#sbtBtn").on("click", function(event) {
  if($('form#enquiryForm').get(0).checkValidity())
    {
      if(validPhone == true ){
        alert('form submitted');
      }else{
        $('#phone1').focus();
        event.preventDefault();
      }
    }
});

