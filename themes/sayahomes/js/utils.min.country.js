//var input1 = document.querySelector("#phone");

  //intlTelInput(input1, {

    //initialCountry: "In",

    //geoIpLookup: function (success, failure) {

      //jQuery.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {

        //var countryCode = (resp && resp.country) ? resp.country : "In";

       // success(countryCode);

     // });

   // },

 // });


jQuery(document).ready(function(){
  setTimeout(function(){ jQuery("#phone").attr("placeholder" , "Mobile Number");
},5000);

  
  telInput = $(".phoneInput");
  telInput.on("countrychange", function(e, countryData) {    
   var contryFlag=jQuery('.iti__selected-flag').attr("title");   
   if (contryFlag == "India (भारत): +91") {
       $("input[name='tel']").val("");
       $("input[name='tel']").attr("minlength", 10).attr("maxlength", 10);
   } else {
       $("input[name='tel']").val("");
       $("input[name='tel']").removeAttr("minlength").removeAttr("maxlength")
   }
  });

});


//var input2 = document.querySelector("#enq_phone");

  //intlTelInput(input2, {

    //initialCountry: "In",

    //geoIpLookup: function (success, failure) {

      //jQuery.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {

        //var countryCode = (resp && resp.country) ? resp.country : "In";

       // success(countryCode);

     // });

   // },

 // });


jQuery(document).ready(function(){
  setTimeout(function(){ jQuery("#enq_phone").attr("placeholder" , "Mobile Number");
},5000);

});
