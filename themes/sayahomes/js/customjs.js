// var baseUrl=window.location.origin + '/git_projects/oberoirealty';
host = window.location.host;
//console.log(host);
var baseUrl = window.location.origin;
if (host == "localhost") {
  baseUrl = window.location.origin + "/oberoi-realty"; //depens on your folder structure, this is for Adarsh
}
// console.log(baseUrl);

jQuery(document).ready(function () {
  jQuery("section#shareholder1 ul.listing-tabs li a").on("click", function () {
    var id = jQuery(this).attr("href");
    jQuery("" + id + " .canvasjs-chart-canvas").addClass("ccanva");
  });

  $("#blogDetail")
    .find(".blogAnchor")
    .each(function () {
      var anchor = $(this).attr("rel");
      //   alert(anchor)
      $(this).attr("href", anchor);
    });
});

function qipFilter(year) {
  var fin_year = parseInt(year) + 1;
  jQuery("#qip_year-selected").html(year + "-" + fin_year);
  jQuery.post(
    baseUrl + "/load_qip_data",
    { action: "year_filter_qipppd", year: year },
    function (data) {
      jQuery("#ftl-data").html(data);
      return false;
    }
  );
}
function cbreReportFilter(year) {
  var fin_year = parseInt(year) + 1;
  jQuery("#cbre_year-selected").html(year + "-" + fin_year);
  jQuery.post(
    baseUrl + "/load_cbre_data",
    { action: "year_filter_cbre", year: year },
    function (data) {
      jQuery("#cbre_reports").html(data);
      return false;
    }
  );
}
function mediaFilter(year) {
  slideUpYearFilter();
  jQuery.post(baseUrl + "/load_media_data", { year: year }, function (data) {
    var obj = JSON.parse(data);
    if (obj.count == 1) {
      jQuery("#press_row").html("No Record Found");
      jQuery("#press_relase_view_all_year").html("");
    } else {
      jQuery("#press_row").html(obj.data);
      if (obj.count > 4)
        jQuery("#press_relase_view_all_year").html(
          '<a href="javascript:void(0)" onclick="viewAllMediaPage(\'press_media_hide\')" class="read-more"><span class="icon-cta-icon MR3"></span>VIEW ALL FOR ' +
            year +
            '<span class="icon-cta-icon"></span></a>'
        );
      else jQuery("#press_relase_view_all_year").html("");
    }
  });
  jQuery.post(baseUrl + "/load_print_data", { year: year }, function (data) {
    var obj = JSON.parse(data);
    if (obj.count == 1) {
      jQuery("#print_row").html("No Record Found");
      jQuery("#print_view_all_year").html("");
    } else {
      jQuery("#print_row").html(obj.data);
      if (obj.count > 4)
        jQuery("#print_view_all_year").html(
          '<a href="javascript:void(0)" onclick="viewAllMediaPage(\'print_media_hide\')" class="read-more"><span class="icon-cta-icon MR3"></span>VIEW ALL FOR ' +
            year +
            '<span class="icon-cta-icon"></span></a>'
        );
      else jQuery("#print_view_all_year").html("");
    }
  });
  jQuery.post(
    baseUrl + "/load_television_data",
    { year: year },
    function (data) {
      //jQuery('#television_row').html(data);
      var obj = JSON.parse(data);
      if (obj.count == 1) {
        jQuery("#television_row").html("No Record Found");
        jQuery("#television_view_all_year").html("");
      } else {
        jQuery("#television_row").html(obj.data);
        if (obj.count > 4)
          jQuery("#television_view_all_year").html(
            '<a href="javascript:void(0)" onclick="viewAllMediaPage(\'television_media_hide\')" class="read-more"><span class="icon-cta-icon MR3"></span>VIEW ALL FOR ' +
              year +
              '<span class="icon-cta-icon"></span></a>'
          );
        else jQuery("#television_view_all_year").html("");
      }
    }
  );
  jQuery.post(baseUrl + "/load_online_data", { year: year }, function (data) {
    //jQuery('#online_row').html(data);
    var obj = JSON.parse(data);
    if (obj.count == 1) {
      jQuery("#online_row").html("No Record Found");
      jQuery("#online_view_all_year").html("");
    } else {
      jQuery("#online_row").html(obj.data);
      if (obj.count > 4)
        jQuery("#online_view_all_year").html(
          '<a href="javascript:void(0)" onclick="viewAllMediaPage(\'online_media_hide\')" class="read-more"><span class="icon-cta-icon MR3"></span>VIEW ALL FOR ' +
            year +
            '<span class="icon-cta-icon"></span></a>'
        );
      else jQuery("#online_view_all_year").html("");
    }
  });
  jQuery.post(
    baseUrl + "/load_charment_message",
    { year: year },
    function (data) {
      if (data.length == "") {
        jQuery(".amedia").hide();
      } else {
        jQuery(".amedia").show();
      }
      jQuery("#cmsg").html("");
      jQuery("#cmsg").html(data);
    }
  );
}
function investorLandingFilter(year) {
  jQuery("#dropdownMenuButton").html(
    year + '<span class="icon-noun-dropdown-3574472"></span>'
  );
  slideUpYearFilter();
  var activeQty = jQuery("#activeQuater").val();
  jQuery.post(
    baseUrl + "/load_investorLanding_data",
    { year: year, activeQty: activeQty },
    function (data) {
      jQuery("#board_meeting_row").html(data);
    }
  );
}
function financialStatementsFilter(year) {
  var code_year = parseInt(year) + 1;
  jQuery("#dropdownMenuButton").html(
    "FY " +
      year +
      "-" +
      code_year +
      ' <span class="icon-noun-dropdown-3574472"></span>'
  );
  var activeQty = jQuery("#activeQuater").val();
  slideUpYearFilter();
  jQuery.post(
    baseUrl + "/load_financialStatements_data",
    { year: year, activeQty: activeQty },
    function (data) {
      jQuery("#financial_row").html(data);
    }
  );
  jQuery.post(
    baseUrl + "/load_annualReport_data",
    { year: year },
    function (data) {
      jQuery("#annualReport_row").html(data);
    }
  );
  jQuery.post(
    baseUrl + "/load_subsidiary_data",
    { year: year },
    function (data) {
      jQuery("#subsidiary_row").html(data);
    }
  );
  jQuery.post(baseUrl + "/load_stock_data", { year: year }, function (data) {
    jQuery("#stock_row").html(data);
  });
  jQuery.post(baseUrl + "/load_debt_data", { year: year }, function (data) {
    jQuery("#debt_row").html(data);
  });
}
function filterActiveDiv(str) {
  jQuery("#activeQuater").val(str);
}
function codePolicesFilter(year) {
  var code_year = parseInt(year) + 1;
  jQuery("#dropdownMenuButton").html(year + "-" + code_year);
  jQuery("#dropdownMenuButton").html(
    year +
      ' <span class="icon-noun-dropdown-3574472" style="font-size: 9px;"></span>'
  );
  slideUpYearFilter();
  jQuery.post(
    baseUrl + "/load_codePolices_data",
    { year: year },
    function (data) {
      jQuery("#codes_row").html(data);
    }
  );
}
function slideUpYearFilter() {
  // jQuery(".dropdown-menu-right").removeClass("show");
  jQuery(".dropdown-menu").removeClass("show");
  jQuery(".dropdown-toggle").removeClass("show");
}
function othersFilter(year) {
  var other_year = parseInt(year) + 1;
  jQuery("#dropdownMenuButtonOther").html(year + "-" + other_year);
  jQuery("#dropdownMenuButtonOther").html(
    year +
      ' <span class="icon-noun-dropdown-3574472" style="font-size: 9px;"></span>'
  );
  slideUpYearFilter();
  jQuery.post(baseUrl + "/load_others_data", { year: year }, function (data) {
    jQuery("#others_row").html(data);
  });
}
function shareholderFilter(year) {
  //jQuery('.nav-link').removeClass('active');
  var code_year = parseInt(year) + 1;
  jQuery("#dropdownMenuButton").html(
    "FY " +
      year +
      "-" +
      code_year +
      ' <span class="icon-noun-dropdown-3574472"></span>'
  );
  slideUpYearFilter();
  jQuery("#shareholder_year").html("FY " + year);
  jQuery.post(
    baseUrl + "/load_shareholder_data",
    { year: year },
    function (data) {
      jQuery("#sharepie-content").html(data);
      graph_load_ajax();
      //pi_map();
    }
  );
}
function mediaCoverageFilter() {
  var arr = [];
  $("input.custom-control-input:checkbox:checked").each(function () {
    arr.push($(this).val());
  });
  var tags = arr.toString();
  jQuery.post(
    baseUrl + "/load_mediaCoverage_data",
    { tags: tags },
    function (data) {
      jQuery("#media_coverage_row").html(data);
    }
  );
}
function mediaCoverageFilter() {
  var arr = [];
  $("input.custom-control-input:checkbox:checked").each(function () {
    arr.push($(this).val());
  });
  var tags = arr.toString();
  jQuery.post(
    baseUrl + "/load_mediaCoverage_data",
    { tags: tags },
    function (data) {
      jQuery("#media_coverage_row").html(data);
    }
  );
}
function viewAll(str) {
  for (var i = 1; i < str; i++) {
    jQuery("#div_" + i).show();
  }
}
function mshareHolderFilter(mid) {
  var month = jQuery("#month_" + mid).val();
  var year = jQuery("#year_" + mid).val();
  var curr_tab_id = jQuery("#" + mid + "_selected_tab").val();
  jQuery.post(
    baseUrl + "/load_shareholderFilter_data",
    { month: month, year: year, market: curr_tab_id },
    function (data) {
      var obj = JSON.parse(data);
      if (obj != null) {
        jQuery("#" + mid + "_openingprice").html(obj.openingprice);
        jQuery("#" + mid + "_highestprice").html(obj.highestprice);
        jQuery("#" + mid + "_averagevolume").html(obj.averagevolume);
        jQuery("#" + mid + "_closingprice").html(obj.closingprice);
        jQuery("#" + mid + "_lowestprice").html(obj.lowestprice);
        jQuery("#" + mid + "_notedata").html(obj.notedata);
        //jQuery('#'+mid+'_shareshartdata').html('<a href="'+obj.shareshartdata+'" class="share-data" target="_blank"><span class="icon-noun-pdf-781710"></span>SHARE CHART DATA</a>');
        if (obj.shareshartdata.length != "") {
          jQuery("#" + mid + "_shareshartdata").html(
            '<a href="' +
              obj.shareshartdata +
              '" class="share-data" target="_blank"><span class="icon-noun-pdf-781710"></span>SHARE CHART DATA</a>'
          );
        } else {
          jQuery("#" + mid + "_shareshartdata").html("");
        }
      } else {
        jQuery("#" + mid + "_openingprice").html("N/A");
        jQuery("#" + mid + "_highestprice").html("N/A");
        jQuery("#" + mid + "_averagevolume").html("N/A");
        jQuery("#" + mid + "_closingprice").html("N/A");
        jQuery("#" + mid + "_lowestprice").html("N/A");
        jQuery("#" + mid + "_notedata").html("");
        jQuery("#" + mid + "_shareshartdata").html("");
      }
    }
  );
}
function projectFilter() {
  var active_div = jQuery("#active_div").val();
  var term_id = jQuery("#active_div_term_id").val();
  var completion_status = [];
  var location_arr = [];
  var storeys = [];
  var carpet_area = [];
  $('input[name="completion_status"]:checked').each(function () {
    completion_status.push(this.value);
  });
  $('input[name="location"]:checked').each(function () {
    location_arr.push(this.value);
  });
  $('input[name="storeys"]:checked').each(function () {
    storeys.push(this.value);
  });
  $('input[name="carpet_area"]:checked').each(function () {
    carpet_area.push(this.value);
  });
  var completion_status_string = completion_status.toString();
  var location_arr_string = location_arr.toString();
  var storeys_string = storeys.toString();
  var carpet_area_string = carpet_area.toString();
  if (
    completion_status_string == "" &&
    location_arr_string == "" &&
    storeys_string == "" &&
    carpet_area_string == ""
  ) {
    jQuery("#filter_applied_section").hide();
  } else {
    jQuery("#filter_applied_section").show();
  }
  jQuery.post(
    baseUrl + "/load_projectFilter_data",
    {
      completion_status: completion_status_string,
      location: location_arr_string,
      storeys: storeys_string,
      carpet_area: carpet_area_string,
      active_div: active_div,
      term_id: term_id,
    },
    function (data) {
      var obj = JSON.parse(data);
      jQuery("#" + active_div + "_project_div").html(obj.html);
      //jQuery('#completion_status').html(obj.completion);
      //jQuery('#location_status').html(obj.location_html);
      //jQuery('#configuration_status').html(obj.storeys_html);
    }
  );
}
function getActiveId(str, term_id) {
  jQuery("#active_div").val(str);
  jQuery("#active_div_term_id").val(term_id);
  removeAllFilter();
}
function filterTags(tags, id) {
  if ($("#" + id).is(":checked")) {
    jQuery("#tags").append(
      '<li id="append_' +
        id +
        '"><span>' +
        tags +
        '</span> <a class="close" href="javascript:;" onclick="removeFilter(\'' +
        id +
        "')\">x</a></li>"
    );
  } else {
    jQuery("#append_" + id).remove();
  }
  //projectFilter();
}
function removeFilter(id) {
  jQuery("#" + id).prop("checked", false);
  jQuery("#append_" + id).remove();
  projectFilter();
}
function removeAllFilter() {
  //window.location.href = baseUrl+'/our-projects';
  $('input[name="completion_status"]:checked').prop("checked", false);
  $('input[name="location"]:checked').prop("checked", false);
  $('input[name="storeys"]:checked').prop("checked", false);
  $('input[name="carpet_area"]:checked').prop("checked", false);
  jQuery("#tags").html("");
  //projectFilter();
  var active_div = jQuery("#active_div").val();
  var term_id = jQuery("#active_div_term_id").val();
  var completion_status = [];
  var location_arr = [];
  var storeys = [];
  var carpet_area = [];
  $('input[name="completion_status"]:checked').each(function () {
    completion_status.push(this.value);
  });
  $('input[name="location"]:checked').each(function () {
    location_arr.push(this.value);
  });
  $('input[name="storeys"]:checked').each(function () {
    storeys.push(this.value);
  });
  $('input[name="carpet_area"]:checked').each(function () {
    carpet_area.push(this.value);
  });
  var completion_status_string = completion_status.toString();
  var location_arr_string = location_arr.toString();
  var storeys_string = storeys.toString();
  var carpet_area_string = carpet_area.toString();
  jQuery("#filter_applied_section").hide();
  jQuery.post(
    baseUrl + "/load_projectFilter_data",
    {
      completion_status: completion_status_string,
      location: location_arr_string,
      storeys: storeys_string,
      carpet_area: carpet_area_string,
      active_div: active_div,
      term_id: term_id,
    },
    function (data) {
      var obj = JSON.parse(data);
      jQuery("#" + active_div + "_project_div").html(obj.html);
      jQuery("#completion_status").html(obj.completion);
      jQuery("#location_status").html(obj.location_html);
      jQuery("#configuration_status").html(obj.storeys_html);
    }
  );
}
function viewAllFaq(div_id, count) {
  for (var i = 1; i < count; i++) {
    jQuery("#" + div_id + "_" + i).show();
  }
}
function viewAllFaqq(div_id) {
  var rdtext = jQuery("#" + div_id + " .read-more").text();

  if (rdtext == "VIEW ALL") {
    jQuery("#" + div_id + " .aminitiesSec").show();
    jQuery("#" + div_id + " .read-more").html(
      'VIEW LESS<span class="icon-cta-icon"></span>'
    );
  } else {
    jQuery("#" + div_id + " .aminitiesSec").hide();
    jQuery("#" + div_id + " .read-more").html(
      'VIEW ALL<span class="icon-cta-icon"></span>'
    );
  }
}
function resnedOtpBtnEnable() {
  var timeLeft = 30;
  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      jQuery(".resendOtpTimer").hide();
      $(".resentOtp-btn").attr("disabled", false);
      $(".resentOtp-btn").css("opacity", "1");
      
      // Disable verify OTP button when timer ends
      $(".homeForm-otp-varify, .enqForm-otp-varify, .enqForm1-otp-varify").attr("disabled", true);
      $(".homeForm-otp-varify, .enqForm-otp-varify, .enqForm1-otp-varify").css("opacity", "0.5");
    } else {
      jQuery(".resendOtpTimer").html(" (" + timeLeft + " Secs)");
      timeLeft--;
    }
  }
}

function saveContactUs() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#name").val();
  var email = jQuery("#email").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#phone"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  var mobile = jQuery("#phone").val();
  var property = jQuery("#property").val();
  var bookvisit = jQuery('input[name="bookSiteRadio"]:checked').val();
  // var waoptin_radio=jQuery('input[name="waoptin_radio"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker2").val();
  var refrance_page = jQuery("#refrance_page").val();
  var tracking_code = jQuery("#tracking_code").val();
  var utm_source = jQuery("#utmSource").val();
  var utm_medium = jQuery("#utmMedium").val();
  var utm_term = jQuery("#utmTerm").val();
  var utm_campaign = jQuery("#utmCampaign").val();

  jQuery("#name_error").html("");
  jQuery("#phone_error").html("");
  jQuery("#email_error").html("");
  jQuery("#property_error").html("");
  jQuery("#radio_error").html("");
  jQuery("#radio_error_waoptin").html("");
  jQuery("#datetimepicker2_error").html("");
  if (name == "") {
    jQuery("#name_error").html("Please enter name");
    jQuery("#name").focus();
    return false;
  } else if (mobile == "") {
    jQuery("#phone_error").html("Please enter mobile number");
    jQuery("#phone").focus();
    return false;
  }

  if (mobile.length < 10 && dial_code === "+91") {
    //alert("true");
    jQuery("#phone_error").html("Please enter valid mobile number");
    jQuery("#phone").focus();
    return false;
  }

  if (mobile.length < 7 && dial_code !== "+91") {
    alert("false");
    jQuery("#phone_error").html("Please enter valid mobile number");
    jQuery("#phone").focus();
    return false;
  } else if (mobile.length > 13) {
    jQuery("#phone_error").html("Please enter valid mobile number");
    jQuery("#phone").focus();
    return false;
  } else if (phoneFilter.test(mobile) == false) {
    jQuery("#phone_error").html("Please enter valid mobile number");
    jQuery("#phone").focus();
    return false;
  } else if (email == "") {
    jQuery("#email_error").html("Please enter email id");
    jQuery("#email").focus();
    return false;
  } else if (testEmail.test(email) == false) {
    jQuery("#email_error").html("Please enter valid email id");
    jQuery("#email").focus();
    return false;
  } else if (property == "") {
    jQuery("#property_error").html("Please select property type");
    jQuery("#property").focus();
    return false;
  } else if (bookvisit == undefined) {
    jQuery("#radio_error").html("Please select visit type");
    return false;
  } else if (bookvisit == "yes" && datetimepicker2 == "") {
    jQuery("#datetimepicker2_error").html("Please select date");
    jQuery("#datetimepicker2").focus();
    return false;
  }
  // else if(waoptin_radio==undefined)
  // 	{
  // 		jQuery('#radio_error_waoptin').html('Please opt any option');
  // 		return false;
  // 	}
  else {
    // Skip OTP for non-Indian numbers
    if (dial_code !== "+91") {
      var propertyName = "";
      if (property == "OSC_A-D") propertyName = "skycity";
      if (property == "OEY_A") propertyName = "elysian";
      if (property == "OMX") propertyName = "maxima";
      if (property == "OEG") propertyName = "enigma";
      if (property == "OET") propertyName = "eternia";
      if (property == "OFV") propertyName = "forestville";
      if (property == "OJD") propertyName = "jardin";

      jQuery.post(
        baseUrl + "/save_contactus",
        {
          name: name,
          email: email,
          mobile: mobile,
          dial_code: dial_code,
          property: property,
          bookvisit: bookvisit,
          date_time: datetimepicker2,
          refrance_page: refrance_page,
          tracking_code: tracking_code,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_term: utm_term,
          utm_campaign: utm_campaign,
        },
        function (data) {
          // Store email and phone in cookies for thank you page
          try {
            document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
            document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
          } catch (e) {}
          
          window.location.href = baseUrl + "/thank-you?project=" + propertyName;
          jQuery("#homeForm")[0].reset();
        }
      );
      return;
    }

    jQuery(".homeForm-wrapper").hide();
    $.ajax({
      type: "POST",
      url: baseUrl + "/send_otp",
      data: $("#homeForm").serialize(),
      success: function (respond_message) {},
      error: function (respond_message) {},
    });
    jQuery(".homeForm-submit").hide();
    jQuery(
      ".homeForm-otp-wrapper,.homeForm-otp-varify,.homeForm-resend-otp"
    ).show();
    setTimeout(function () {
      $(".resentOtp-btn").css("opacity", "0.5").attr("disabled", true);
      jQuery(".resendOtpTimer").show().html(" (30 Secs)");
      $(".homeForm-otp-varify").attr("disabled", false).css("opacity", "1"); resnedOtpBtnEnable();
    }, 100);

    // alert("opt sent");
  }
}

function homeFormVarifyOTP() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#name").val();
  var email = jQuery("#email").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#phone"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  var mobile = jQuery("#phone").val();
  var property = jQuery("#property").val();
  var bookvisit = jQuery('input[name="bookSiteRadio"]:checked').val();
  // var waoptin_radio=jQuery('input[name="waoptin_radio"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker2").val();
  var refrance_page = jQuery("#refrance_page").val();
  var tracking_code = jQuery("#tracking_code").val();
  var utm_source = jQuery("#utmSource").val();
  var utm_medium = jQuery("#utmMedium").val();
  var utm_term = jQuery("#utmTerm").val();
  var utm_campaign = jQuery("#utmCampaign").val();
  var otpinput = jQuery("#otpinput").val();
  var propertyName = "";
  if (property == "OSC_A-D") {
    propertyName = "skycity";
  }
  if (property == "OEY_A") {
    propertyName = "elysian";
  }
  if (property == "OMX") {
    propertyName = "maxima";
  }
  if (property == "OEG") {
    propertyName = "enigma";
  }
  if (property == "OET") {
    propertyName = "eternia";
  }
  if (property == "OFV") {
    propertyName = "forestville";
  }
  if (property == "OJD") {
    propertyName = "jardin";
  }
  if (otpinput == "") {
    jQuery("#otp_error").html("Please enter OTP");
    jQuery("#otpinput").focus();
    return false;
  } else {
    jQuery(".homeForm-otp-varify").prop("disabled", true).html("Verifying...");
    jQuery("#otp_error").html("");
    
    $.ajax({
      type: "POST",
      url: baseUrl + "/verify_otp",
      data: {tel: mobile, otpinput: otpinput},
      dataType: 'json',
      success: function (respond_message) {
        if (respond_message.status == "success") {
          jQuery(".homeForm-otp-wrapper,.homeForm-otp-varify,.homeForm-resend-otp").hide();
          jQuery(".homeForm-wrapper,.homeForm-submit").show();
          jQuery.post(
            baseUrl + "/save_contactus",
            {
              name: name,
              email: email,
              mobile: mobile,
              dial_code: dial_code,
              property: property,
              bookvisit: bookvisit,
              date_time: datetimepicker2,
              refrance_page: refrance_page,
              tracking_code: tracking_code,
              utm_source: utm_source,
              utm_medium: utm_medium,
              utm_term: utm_term,
              utm_campaign: utm_campaign,
            },
            function (data) {
              // Store email and phone in cookies for thank you page
              try {
                document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
                document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
              } catch (e) {}
              
              try {
                jQuery("#homeForm")[0].reset();
              } catch (e) {}
              window.location.href = baseUrl + "/thank-you?project=" + propertyName;
            }
          );
        } else {
          jQuery(".homeForm-otp-varify").prop("disabled", false).html("Verify OTP");
          jQuery("#otp_error").html(respond_message.message || "Please enter correct OTP");
        }
      },
      error: function (respond_message) {
        jQuery(".homeForm-otp-varify").prop("disabled", false).html("Verify OTP");
        jQuery("#otp_error").html("Error verifying OTP");
      },
    });
  }
}

jQuery(document).ready(function () {
  // console.log("ffsgfgfsggfg 3")
  jQuery(document).on('click', '.iti__country-list li', function () {
    var dflag = '+' + jQuery(this).data('dial-code');
    if (dflag !== '+undefined') {
      jQuery('input#dial_code, input#enq_dial_code, input.cont_code').val(dflag);
    }
  });
  
  $('#enq_phone, #enq_phone1').on('input', function () {
    let value = $(this).val();
    // Allow only one optional '+' at the beginning, followed by digits
    value = value.replace(/(?!^)\+/g, ''); // Remove any '+' not at start
    value = value.replace(/[^+\d]/g, '');  // Remove everything except digits and leading '+'
  
    $(this).val(value);
  });
  
  $('#phone').on('input', function () {
    let value = $(this).val();
    // Allow only one optional '+' at the beginning, followed by digits
    value = value.replace(/(?!^)\+/g, ''); // Remove any '+' not at start
    value = value.replace(/[^+\d]/g, '');  // Remove everything except digits and leading '+'
  
    $(this).val(value);
  });
  
  jQuery('#name, #email, #phone, #enq_phone, #enq_phone1, #enq_name, #enq_name1, #enq_email, #enq_email1').on('copy paste cut', function (e) {
    e.preventDefault();
  });
  
  $('#name').on('input', function () {
    let value = $(this).val();
    //   Do not allow first character to be a space
    value = value.replace(/^\s+/, ''); // Remove leading spaces
    value = value.replace(/[^A-Za-z\s]/g, '');
   
    if (value.length > 250) {
      value = value.substring(0, 250); // limit to 100 characters
    }
    $(this).val(value);
  });

  $('#enq_name, #enq_name1').on('input', function () {
    let value = $(this).val();
    //   Do not allow first character to be a space
    value = value.replace(/^\s+/, ''); // Remove leading spaces
    value = value.replace(/[^A-Za-z\s]/g, '');
   
    if (value.length > 250) {
      value = value.substring(0, 250); // limit to 100 characters
    }
    $(this).val(value);
  });

  // Email validation on input, max 254 characters
  $('#enq_email, #enq_email1').on('input', function () {
    let email = $(this).val().trim();
    if (email.length > 254) {
      email = email.substring(0, 254); // limit to 254 characters
      $(this).val(email);
    }
  });
});

function saveEnqForm() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#enq_name").val();
  var email = jQuery("#enq_email").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#enq_phone"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  var mobile = jQuery("#enq_phone").val();
  var property = jQuery("#enq_property").val();
  var bookvisit = jQuery('input[name="bookSiteRadio"]:checked').val();
  var configuration = jQuery("#configuration").val();
  var budget = jQuery("#budget").val();

  // var waoptin_radio=jQuery('input[name="waoptin_radio"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker1").val();
  var refrance_page = jQuery("#enq_refrance_page").val();
  var tracking_code = jQuery("#tracking_code").val();
  var utm_source = jQuery("#enq_utmSource").val();
  var utm_medium = jQuery("#enq_utmMedium").val();
  var utm_term = jQuery("#enq_utmTerm").val();
  var utm_campaign = jQuery("#enq_utmCampaign").val();

  jQuery("#enq_name_error").html("");
  jQuery("#enq_phone_error").html("");
  jQuery("#enq_email_error").html("");
  jQuery("#enq_property_error").html("");
  jQuery("#enq_radio_error").html("");
  jQuery("#enq_datetimepicker1_error").html("");
  if (name == "") {
    jQuery("#enq_name_error").html("Please enter name");
    jQuery("#enq_name").focus();
    return false;
  } else if (mobile == "") {
    jQuery("#enq_phone_error").html("Please enter mobile number");
    jQuery("#enq_phone").focus();
    return false;
  }

  if (mobile.length < 10 && dial_code === "+91") {
    jQuery("#enq_phone_error").html("Please enter valid mobile number");
    jQuery("#enq_phone").focus();
    return false;
  }

  if (mobile.length < 7 && dial_code !== "+91") {
    jQuery("#enq_phone_error").html("Please enter valid mobile number");
    jQuery("#enq_phone").focus();
    return false;
  } else if (mobile.length > 13) {
    jQuery("#enq_phone_error").html("Please enter valid mobile number");
    jQuery("#enq_phone").focus();
    return false;
  } else if (phoneFilter.test(mobile) == false) {
    jQuery("#enq_phone_error").html("Please enter valid mobile number");
    jQuery("#enq_phone").focus();
    return false;
  } else if (email == "") {
    jQuery("#enq_email_error").html("Please enter email id");
    jQuery("#enq_email").focus();
    return false;
  } else if (testEmail.test(email) == false) {
    jQuery("#enq_email_error").html("Please enter valid email id");
    jQuery("#enq_email").focus();
    return false;
  } else if (property == "") {
    jQuery("#enq_property_error").html("Please select property type");
    jQuery("#enq_property").focus();
    return false;
  }
  // else if (configuration == '' && jQuery('#configuration').is(':visible'))
  // {
  // 	jQuery('#config_error').html('Please select configuration');
  // 	jQuery('#configuration').focus();
  // 	return false;
  // }
  // else if(budget=='' && jQuery('#budget').is(':visible'))
  // {
  // 	jQuery('#budget_error').html('Please select budget');
  // 	jQuery('#budget').focus();
  // 	return false;
  // }
  else if (bookvisit == undefined) {
    jQuery("#enq_radio_error").html("Please select visit type");
    return false;
  } else if (bookvisit == "yes" && datetimepicker2 == "") {
    jQuery("#datetimepicker1_error").html("Please select date");
    jQuery("#datetimepicker1").focus();
    return false;
  } else if (
    jQuery("#cookieConsent").is(":visible") &&
    !document.getElementById("cookieConsent").checked
  ) {
    document.getElementById("cookie_consent_error").textContent =
      "Please accept our cookie policy to continue.";
    return false;
  }
  // } else if (
  //   ["/usa", "/london"].some(function (url) {
  //     return window.location.pathname.includes(url);
  //   }) &&
  //   !document.getElementById("cookieConsent").checked
  // ) {
  //   document.getElementById("cookie_consent_error").textContent =
  //     "Please accept our cookie policy to continue.";
  //   return false;
  // }
  // else if(waoptin_radio==undefined)
  // 	{
  // 		jQuery('#radio_error_waoptin').html('Please opt any option');
  // 		return false;
  // 	}
  else {
    // Skip OTP for non-Indian numbers
    if (dial_code !== "+91") {
      var propertyName = "";
      if (property == "OSC_A-D") propertyName = "skycity";
      if (property == "OEY-A") propertyName = "elysian";
      if (property == "OMX") propertyName = "maxima";
      if (property == "OEG") propertyName = "enigma";
      if (property == "OET") propertyName = "eternia";
      if (property == "OFV") propertyName = "forestville";
      if (property == "OJD") propertyName = "jardin";

      if (propertyName != "" && propertyName == "forestville") {
        try {
          document.cookie =
            "or_userEmail=" +
            encodeURIComponent(email) +
            "; path=/; max-age=1800; SameSite=Lax";
          document.cookie =
            "or_userPhone=" +
            encodeURIComponent(mobile) +
            "; path=/; max-age=1800; SameSite=Lax";
        } catch (e) {}
      }

      jQuery.post(
        baseUrl + "/save_contactus",
        {
          name: name,
          email: email,
          mobile: mobile,
          dial_code: dial_code,
          property: property,
          bookvisit: bookvisit,
          date_time: datetimepicker2,
          refrance_page: refrance_page,
          tracking_code: tracking_code,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_term: utm_term,
          utm_campaign: utm_campaign,
          configuration: configuration,
          budget: budget,
        },
        function (data) {
          // Store email and phone in cookies for thank you page
          if (propertyName != "") {
            try {
              document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
              document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
            } catch (e) {}
          }
          
          window.location.href = baseUrl + "/thank-you?project=" + propertyName;
          jQuery("#enq_form")[0].reset();
        }
      );
      return;
    }

    jQuery(".enqForm-wrapper").hide();
    $.ajax({
      type: "POST",
      url: baseUrl + "/send_otp",
      data: $("#enq_form").serialize(),
      success: function (respond_message) {},
      error: function (respond_message) {},
    });
    jQuery(".enqForm-submit").hide();
    jQuery(
      ".enqForm-otp-wrapper,.enqForm-otp-varify,.enqForm-resend-otp"
    ).show();
    setTimeout(function () {
      $(".resentOtp-btn").css("opacity", "0.5").attr("disabled", true);
      jQuery(".resendOtpTimer").show().html(" (30 Secs)");
      $(".enqForm-otp-varify").attr("disabled", false).css("opacity", "1"); resnedOtpBtnEnable();
    }, 100);
    // alert("opt sent");
  }
}

// Global flag to track which Taboola pixels have been loaded
window.loadedTaboolaPixels = window.loadedTaboolaPixels || {};

function triggerTaboolaPixel(id, event) {
  console.log("triggerTaboolaPixel called with ID: " + id);

  // If this pixel ID has already been loaded, don't load it again
  if (window.loadedTaboolaPixels[id]) {
    console.log(
      "Taboola pixel ID " + id + " already loaded, skipping duplicate"
    );
    return;
  }

  // Mark this pixel ID as loaded
  window.loadedTaboolaPixels[id] = true;

  // Check if we're on a thank-you page, if so, don't trigger the pixel here
  // as it will be handled by the HTML template
  var currentPath = window.location.pathname;
  if (currentPath.indexOf("/thank-you") !== -1) {
    console.log(
      "Skipping Taboola pixel on thank-you page as it's handled by the template"
    );
    return;
  }

  // Get the form's page_url value
  var formPageUrl = jQuery("#page_url").val();
  console.log("Form page_url value: " + formPageUrl);

  // Only trigger the pixel if the form's page_url matches the expected value for this pixel ID
  var shouldTrigger = false;

  if (id === 1334477) {
    // Eternia & Enigma
    shouldTrigger =
      formPageUrl && formPageUrl.indexOf("/eternia-enigma-nri/") !== -1;
  } else if (id === 1323281) {
    // Forestville
    shouldTrigger =
      formPageUrl && formPageUrl.indexOf("/forestville-nri/") !== -1;
  } else if (id === 1257556) {
    // Oberoi Garden City
    shouldTrigger =
      formPageUrl &&
      formPageUrl.indexOf("/oberoi-garden-city/thane-nri/") !== -1;
  }

  if (!shouldTrigger) {
    console.log(
      "Form page_url doesn't match expected value for pixel ID " +
        id +
        ", skipping"
    );
    return;
  }

  console.log(
    "Loading Taboola pixel ID: " + id + " for form page_url: " + formPageUrl
  );

  window._tfa = window._tfa || [];
  window._tfa.push({
    notify: "event",
    name: "page_view",
    id: id,
  });

  var scriptId = "tb_tfa_script_dynamic_" + id;
  if (!document.getElementById(scriptId)) {
    var t = document.createElement("script");
    t.async = 1;
    t.src = "//cdn.taboola.com/libtrc/unip/" + id + "/tfa.js";
    t.id = scriptId;
    document
      .getElementsByTagName("script")[0]
      .parentNode.insertBefore(t, document.getElementsByTagName("script")[0]);
  }

  window._tfa.push({ notify: "event", name: event, id: id });
  console.log("Taboola Lead Pixel Triggered:" + event + " for ID: " + id);
}

function enqFormVerifyOTP() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#enq_name").val();
  var email = jQuery("#enq_email").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#enq_phone"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  var mobile = jQuery("#enq_phone").val();
  var property = jQuery("#enq_property").val();
  var configuration = jQuery("#configuration").val();
  var budget = jQuery("#budget").val();
  var bookvisit = jQuery('input[name="bookSiteRadio"]:checked').val();
  // var waoptin_radio=jQuery('input[name="waoptin_radio"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker1").val();
  var refrance_page = jQuery("#enq_refrance_page").val();
  var tracking_code = jQuery("#tracking_code").val();
  var utm_source = jQuery("#enq_utmSource").val();
  var utm_medium = jQuery("#enq_utmMedium").val();
  var utm_term = jQuery("#enq_utmTerm").val();
  var utm_campaign = jQuery("#enq_utmCampaign").val();
  var enqformotpinput = jQuery("#enqFormOtpInput").val();
  var page_url = jQuery("#page_url").val();
  var propertyName = "";
  if (property == "OSC_A-D") {
    propertyName = "skycity";
  }
  if (property == "OEY_A") {
    propertyName = "elysian";
  }
  if (property == "OMX") {
    propertyName = "maxima";
  }
  if (property == "OEG") {
    propertyName = "enigma";
  }
  if (property == "OET") {
    propertyName = "eternia";
  }
  if (property == "OFV") {
    propertyName = "forestville";
  }
  if (property == "OJD") {
    propertyName = "jardin";
  }
  if (enqformotpinput == "") {
    jQuery("#enqFormOtp_error").html("Please enter OTP");
    jQuery("#enqFormOtpInput").focus();
    return false;
  } else {
    jQuery(".enqForm-otp-varify").prop("disabled", true).html("Verifying...");
    jQuery("#enqFormOtp_error").html("");
    
    $.ajax({
      type: "POST",
      url: baseUrl + "/verify_otp",
      data: {tel: mobile, otpinput: enqformotpinput},
      dataType: 'json',
      success: function (respond_message) {
        if (respond_message.status == "success") {
          // alert("proj--"+waoptin_radio)
          jQuery(
            ".enqForm-otp-wrapper,.enqForm-otp-varify,.enqForm-resend-otp"
          ).hide();
          jQuery(".enqForm-wrapper,.enqForm-submit").show();
          // alert(property+"--"+propertyName);
          if (
            typeof window.dataLayer !== "undefined" &&
            Array.isArray(window.dataLayer)
          ) {
            // Push the custom event with user data
            // window.dataLayer.push({
            // 	'event': 'enquiry_form', // Change this to your desired event name
            // 	'email': email,
            // 	'phone_number': mobile
            // });

            // window.dataLayer.push({
            // 	'event': 'elysian_form_success', // Change this to your desired event name
            // 	'cssProvidedEnhancedConversionValue': {
            // 		'email': email,
            // 		'phone_number': mobile,
            // 		'_tag_mode': 'MANUAL'
            // 	}
            // });

            // gtag('set', 'user_data', {
            // 	'email': email,
            // 	'phone_number': mobile
            // });
            // Store values globally for GTM to read
            // Store values globally for GTM to read
            // console.log('called - enhancedConversionData');
            window.enhancedConversionData = {
              email: email,
              phone_number: mobile,
            };

            gtag("event", "elysian_form_success", {
              send_to: "AW-449775914/8utBCLuH-5oZEKqSvNYB", //,
              //  'cssProvidedEnhancedConversionValue': {
              // 	'email': email,
              // 	'phone_number': mobile,
              // 	'_tag_mode': 'MANUAL'
              // }
            });

            // alert(page_url);
            // alert(propertyName);
            // if (
            //   page_url == "/eternia-enigma-nri/usa" ||
            //   page_url == "/eternia-enigma-nri/gcc" ||
            //   page_url == "/eternia-enigma-nri/canada" ||
            //   page_url == "/eternia-enigma-nri/london" ||
            //   page_url == "/eternia-enigma-nri/hongkong" ||
            //   page_url == "/eternia-enigma-nri/singapore"
            // ) {
            //   triggerTaboolaPixel(1334477);
            // }

            if (page_url == "/eternia-enigma-nri/usa") {
              triggerTaboolaPixel(1334477, "EE_US_Lead");
            } else if (page_url == "/eternia-enigma-nri/gcc") {
              triggerTaboolaPixel(1334477, "EE_GCC_Lead");
            } else if (page_url == "/eternia-enigma-nri/canada") {
              triggerTaboolaPixel(1334477, "EE_Canada_Lead");
            } else if (page_url == "/eternia-enigma-nri/london") {
              triggerTaboolaPixel(1334477, "EE_UK_Lead");
            } else if (page_url == "/eternia-enigma-nri/hongkong") {
              triggerTaboolaPixel(1334477, "EE_HK_Lead");
            } else if (page_url == "/eternia-enigma-nri/singapore") {
              triggerTaboolaPixel(1334477, "EE_Singpore_Lead");
            }

            // if (
            //   page_url == "/forestville-nri/gcc" ||
            //   page_url == "/forestville-nri/canada" ||
            //   page_url == "/forestville-nri/singapore" ||
            //   page_url == "/forestville-nri/hongkong" ||
            //   page_url == "/forestville-nri/usa" ||
            //   page_url == "/forestville-nri/london"
            // ) {
            //   triggerTaboolaPixel(1323281);
            // }

            if (page_url == "/forestville-nri/gcc") {
              triggerTaboolaPixel(1323281, "Forestville_GCC_Lead");
            } else if (page_url == "/forestville-nri/canada") {
              triggerTaboolaPixel(1323281, "Forestville_Canada_Lead");
            } else if (page_url == "/forestville-nri/singapore") {
              triggerTaboolaPixel(1323281, "Forestville_Singapore_Lead");
            } else if (page_url == "/forestville-nri/hongkong") {
              triggerTaboolaPixel(1323281, "Forestville_HK_Lead");
            } else if (page_url == "/forestville-nri/usa") {
              triggerTaboolaPixel(1323281, "Forestville_US_Lead");
            } else if (page_url == "/forestville-nri/london") {
              triggerTaboolaPixel(1323281, "Forestville_UK_Lead");
            }

            // if (
            //   page_url == "/oberoi-garden-city/thane-nri/gcc" ||
            //   page_url == "/oberoi-garden-city/thane-nri/canada" ||
            //   page_url == "/oberoi-garden-city/thane-nri/singapore" ||
            //   page_url == "/oberoi-garden-city/thane-nri/hongkong" ||
            //   page_url == "/oberoi-garden-city/thane-nri/usa" ||
            //   page_url == "/oberoi-garden-city/thane-nri/london"
            // ) {
            //   triggerTaboolaPixel(1257556);
            // }

            if (page_url == "/oberoi-garden-city/thane-nri/gcc") {
              triggerTaboolaPixel(1257556, "OGC_GCC_Lead");
            } else if (page_url == "/oberoi-garden-city/thane-nri/canada") {
              triggerTaboolaPixel(1257556, "OGC_Canada_Lead");
            } else if (page_url == "/oberoi-garden-city/thane-nri/singapore") {
              triggerTaboolaPixel(1257556, "OGC_Singapore_Lead");
            } else if (page_url == "/oberoi-garden-city/thane-nri/hongkong") {
              triggerTaboolaPixel(1257556, "OGC_HK_Lead");
            } else if (page_url == "/oberoi-garden-city/thane-nri/usa") {
              triggerTaboolaPixel(1257556, "OGC_US_Lead");
            } else if (page_url == "/oberoi-garden-city/thane-nri/london") {
              triggerTaboolaPixel(1257556, "OGC_UK_Lead");
            }

            console.log("Custom GTM event triggered with email and phone.");
          } else {
            console.warn("GTM dataLayer is not available.");
          }

          if (propertyName != "" && propertyName == "forestville") {
            try {
              document.cookie =
                "or_userEmail=" +
                encodeURIComponent(email) +
                "; path=/; max-age=1800; SameSite=Lax";
              document.cookie =
                "or_userPhone=" +
                encodeURIComponent(mobile) +
                "; path=/; max-age=1800; SameSite=Lax";
            } catch (e) {}
          }
          jQuery.post(
            baseUrl + "/save_contactus",
            {
              name: name,
              email: email,
              mobile: mobile,
              dial_code: dial_code,
              property: property,
              bookvisit: bookvisit,
              date_time: datetimepicker2,
              refrance_page: refrance_page,
              tracking_code: tracking_code,
              utm_source: utm_source,
              utm_medium: utm_medium,
              utm_term: utm_term,
              utm_campaign: utm_campaign,
              configuration: configuration,
              budget: budget,
            },
            function (data) {
              console.log(data);
              
              // Store email and phone in cookies for thank you page
              if (propertyName != "") {
                try {
                  document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
                  document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
                } catch (e) {}
              }
              
              try {
                jQuery("#enq_form")[0].reset();
              } catch (e) {}
              setTimeout(function () {
                window.location.href = baseUrl + "/thank-you?project=" + propertyName;
              }, 500);
            }
          );
        } else {
          jQuery(".enqForm-otp-varify").prop("disabled", false).html("Verify OTP");
          jQuery("#enqFormOtp_error").html(respond_message.message || "Please enter correct OTP");
        }
      },
      error: function (respond_message) {
        jQuery(".enqForm-otp-varify").prop("disabled", false).html("Verify OTP");
        jQuery("#enqFormOtp_error").html("Error verifying OTP");
      },
    });
  }
}

function saveEnqForm1() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#enq_name1").val();
  var email = jQuery("#enq_email1").val();
  var mobile = jQuery("#enq_phone1").val();
  var property = jQuery("#enq_property1").val();
  var bookvisit = jQuery('input[name="enq_customRadioInline1"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker11").val();
  var refrance_page = jQuery("#enq_refrance_page1").val();
  var utm_source = jQuery("#enq_utmSource1").val();
  var utm_medium = jQuery("#enq_utmMedium1").val();
  var utm_term = jQuery("#enq_utmTerm1").val();
  var utm_campaign = jQuery("#enq_utmCampaign1").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#enq_phone1"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  jQuery("#enq_name_error1").html("");
  jQuery("#enq_phone_error1").html("");
  jQuery("#enq_email_error1").html("");
  jQuery("#enq_property_error1").html("");
  jQuery("#enq_radio_error1").html("");
  jQuery("#enq_datetimepicker1_error1").html("");
  if (name == "") {
    jQuery("#enq_name_error1").html("Please enter name");
    jQuery("#enq_name1").focus();
    return false;
  } else if (mobile == "") {
    jQuery("#enq_phone_error1").html("Please enter mobile number");
    jQuery("#enq_phone1").focus();
    return false;
  } else if (mobile.length < 10 && dial_code === "+91") {
    jQuery("#enq_phone_error1").html("Please enter valid mobile number");
    jQuery("#enq_phone1").focus();
    return false;
  } else if (mobile.length < 7 && dial_code !== "+91") {
    jQuery("#enq_phone_error1").html("Please enter valid mobile number");
    jQuery("#enq_phone1").focus();
    return false;
  } else if (mobile.length > 13) {
    jQuery("#enq_phone_error1").html("Please enter valid mobile number");
    jQuery("#enq_phone1").focus();
    return false;
  } else if (phoneFilter.test(mobile) == false) {
    jQuery("#enq_phone_error1").html("Please enter valid mobile number");
    jQuery("#enq_phone1").focus();
    return false;
  } else if (email == "") {
    jQuery("#enq_email_error1").html("Please enter email id");
    jQuery("#enq_email1").focus();
    return false;
  } else if (testEmail.test(email) == false) {
    jQuery("#enq_email_error1").html("Please enter valid email id");
    jQuery("#enq_email1").focus();
    return false;
  } else if (property == "") {
    jQuery("#enq_property_error1").html("Please select property type");
    jQuery("#enq_property1").focus();
    return false;
  } else if (bookvisit == undefined) {
    jQuery("#enq_radio_error1").html("Please select visit type");
    return false;
  } else if (bookvisit == "yes" && datetimepicker2 == "") {
    jQuery("#datetimepicker1_error1").html("Please select date");
    jQuery("#datetimepicker11").focus();
    return false;
  } else {
    // Skip OTP for non-Indian numbers
    if (dial_code !== "+91") {
      var propertyName = "";
      if (property == "OSC_A-D") propertyName = "skycity";
      if (property == "OEY-A") propertyName = "elysian";
      if (property == "OMX") propertyName = "maxima";
      if (property == "OEG") propertyName = "enigma";
      if (property == "OET") propertyName = "eternia";
      if (property == "OFV") propertyName = "forestville";
      if (property == "OJD") propertyName = "jardin";

      jQuery.post(
        baseUrl + "/save_contactus",
        {
          name: name,
          email: email,
          mobile: mobile,
          dial_code: dial_code,
          property: property,
          bookvisit: bookvisit,
          date_time: datetimepicker2,
          refrance_page: refrance_page,
          tracking_code: tracking_code,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_term: utm_term,
          utm_campaign: utm_campaign,
        },
        function (data) {
          try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "lead_submit_success",
              lead_mobile: mobile,
              lead_email: email,
              form_id: "enqFormOtpInput",
            });
          } catch (e) {}
          
          // Store email and phone in cookies for thank you page
          try {
            document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
            document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
          } catch (e) {}
          
          window.location.href = baseUrl + "/thank-you?project=" + propertyName;
          jQuery("#enq_form1")[0].reset();
        }
      );
      return;
    }

    jQuery(".enqForm1-wrapper").hide();
    $.ajax({
      type: "POST",
      url: baseUrl + "/send_otp",
      data: $("#enq_form1").serialize(),
      success: function (respond_message) {},
      error: function (respond_message) {},
    });
    jQuery(".enqForm1-submit").hide();
    jQuery(
      ".enqForm1-otp-wrapper,.enqForm1-otp-varify,.enqForm1-resend-otp"
    ).show();
    setTimeout(function () {
      $(".resentOtp-btn").css("opacity", "0.5").attr("disabled", true);
      jQuery(".resendOtpTimer").show().html(" (30 Secs)");
      $(".enqForm1-otp-varify").attr("disabled", false).css("opacity", "1"); resnedOtpBtnEnable();
    }, 100);
    // alert("opt sent");

    // jQuery.post(baseUrl+"/save_contactus", {'name':name,'email':email,'mobile':mobile,'property':property,'bookvisit':bookvisit,'date_time':datetimepicker2,'refrance_page':refrance_page}, function(data){
    //   window.location.href = baseUrl+'/thank-you';
    // });
  }
}

function enqForm1VerifyOTP() {
  var phoneFilter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var name = jQuery("#enq_name1").val();
  var email = jQuery("#enq_email1").val();
  var mobile = jQuery("#enq_phone1").val();
  var property = jQuery("#enq_property1").val();
  var bookvisit = jQuery('input[name="enq_customRadioInline1"]:checked').val();
  var datetimepicker2 = jQuery("#datetimepicker11").val();
  var refrance_page = jQuery("#enq_refrance_page1").val();
  var tracking_code = jQuery("#tracking_code").val();
  var utm_source = jQuery("#enq_utmSource1").val();
  var utm_medium = jQuery("#enq_utmMedium1").val();
  var utm_term = jQuery("#enq_utmTerm1").val();
  var utm_campaign = jQuery("#enq_utmCampaign1").val();
  var enqform1otpinput = jQuery("#enqForm1OtpInput").val();
  var iti = window.intlTelInputGlobals.getInstance(document.querySelector("#enq_phone1"));
  var dial_code = "+" + (iti ? iti.getSelectedCountryData().dialCode : "91");
  var propertyName = "";
  if (property == "OSC_A-D") {
    propertyName = "skycity";
  }
  if (property == "OEY_A") {
    propertyName = "elysian";
  }
  if (property == "OMX") {
    propertyName = "maxima";
  }
  if (property == "OEG") {
    propertyName = "enigma";
  }
  if (property == "OET") {
    propertyName = "eternia";
  }
  if (property == "OFV") {
    propertyName = "forestville";
  }
  if (property == "OJD") {
    propertyName = "jardin";
  }

  if (enqform1otpinput == "") {
    jQuery("#enqForm1Otp_error").html("Please enter OTP");
    jQuery("#enqForm1OtpInput").focus();
    return false;
  } else {
    jQuery(".enqForm1-otp-varify").prop("disabled", true).html("Verifying...");
    jQuery("#enqForm1Otp_error").html("");
    
    $.ajax({
      type: "POST",
      url: baseUrl + "/verify_otp",
      data: {tel: mobile, otpinput: enqform1otpinput},
      dataType: 'json',
      success: function (respond_message) {
        if (respond_message.status == "success") {
          jQuery(
            ".enqForm1-otp-wrapper,.enqForm1-otp-varify,.enqForm1-resend-otp"
          ).hide();
          jQuery(".enqForm1-wrapper,.enqForm1-submit").show();

          if (
            typeof window.dataLayer !== "undefined" &&
            Array.isArray(window.dataLayer)
          ) {
            // Push the custom event with user data
            window.dataLayer.push({
              event: "enquiry_form", // Change this to your desired event name
              email: email,
              phone_number: mobile,
            });

            console.log("Custom GTM event triggered with email and phone.");
          } else {
            console.warn("GTM dataLayer is not available.");
          }

          jQuery.post(
            baseUrl + "/save_contactus",
            {
              name: name,
              email: email,
              mobile: mobile,
              dial_code: dial_code,
              property: property,
              bookvisit: bookvisit,
              date_time: datetimepicker2,
              refrance_page: refrance_page,
              tracking_code: tracking_code,
              utm_source: utm_source,
              utm_medium: utm_medium,
              utm_term: utm_term,
              utm_campaign: utm_campaign,
            },
            function (data) {
              try {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "lead_submit_success",
                  lead_mobile: mobile,
                  lead_email: email,
                  form_id: "enqFormOtpInput",
                });
              } catch (e) {}
              
              // Store email and phone in cookies for thank you page
              try {
                document.cookie = "or_userEmail=" + encodeURIComponent(email) + "; path=/; max-age=1800; SameSite=Lax";
                document.cookie = "or_userPhone=" + encodeURIComponent(mobile) + "; path=/; max-age=1800; SameSite=Lax";
              } catch (e) {}
              
              try {
                jQuery("#enq_form1")[0].reset();
              } catch (e) {}
              window.location.href = baseUrl + "/thank-you?project=" + propertyName;
            }
          );
        } else {
          jQuery(".enqForm1-otp-varify").prop("disabled", false).html("Verify OTP");
          jQuery("#enqForm1Otp_error").html(respond_message.message || "Please enter correct OTP");
        }
      },
      error: function (respond_message) {
        jQuery(".enqForm1-otp-varify").prop("disabled", false).html("Verify OTP");
        jQuery("#enqForm1Otp_error").html("Error verifying OTP");
      },
    });
  }
}

function fetchProjects(projectCode) {
  // console.log('Fetching projects for project code:', projectCode);
  $.ajax({
    type: "POST",
    url: baseUrl + "/fetch_projects.php",
    data: { projectCode: projectCode },
    success: function (respond_message) {
      response = JSON.parse(respond_message);
      if (response.status === "success") {
        confData = response.configuration;
        // console.log(confData);

        // Populate configuration select options
        $("select#configuration, select#budget").show();
        const configSelect = $("select#configuration");
        configSelect.empty().append('<option value="">Configuration</option>'); // Clear existing options
        confData.forEach(function (item) {
          configSelect.append(
            '<option value="' +
              item.actualValue +
              '">' +
              item.displayName +
              "</option>"
          );
        });

        // Trigger change event to populate budget for the default selection
        configSelect.change();
      } else {
        $("select#configuration, select#budget").hide();
      }
    },
    error: function (respond_message) {
      console.error("Error fetching projects:", respond_message);
    },
  });
}

// Add onchange event listener for the configuration select
$(document).on("change", "select#configuration", function () {
  const selectedConfig = $(this).val();
  const budgetSelect = $("select#budget");
  budgetSelect.empty().append('<option value="">Budget</option>'); // Clear existing options

  // Find the selected configuration in confData
  const config = confData.find((item) => item.actualValue === selectedConfig);
  if (config && config.budget) {
    config.budget.forEach(function (budgetItem) {
      budgetSelect.append(
        '<option value="' +
          budgetItem.actualValue +
          '">' +
          budgetItem.displayValue +
          "</option>"
      );
    });
  }
});

// Fetch projects for project pages
var projectCode = $("#enq_property").val();
//where project is locked
if (projectCode) {
  // console.log('Project code:', projectCode);
  fetchProjects(projectCode);
}
//where project is not locked
else {
  $(document).on("change", "select#enq_property", function () {
    const projectCode2 = $(this).val();
    // console.log('Property changed', projectCode2);
    fetchProjects(projectCode2);
  });
}

// on home page form
$(document).on("change", "select#property", function () {
  const projectCode2 = $(this).val();
  // console.log('Property changed', projectCode2);
  fetchProjects(projectCode2);
});

function activeTab(tab_id) {
  var active = jQuery("#active_tab").val();
  jQuery("#" + active).removeClass("show active");
  jQuery("#active_tab").val(tab_id);
  jQuery("#" + tab_id).addClass("show active");
  var total = jQuery("#total_" + tab_id).val();
  jQuery("#total_result").html(total);
}
function blogActiveTab(tab_id) {
  var active = jQuery("#active_tab").val();
  jQuery("#" + active).removeClass("show active");
  jQuery("#" + tab_id).addClass("show active");
}
function bhkActive(id) {
  var active_div = jQuery("#active_div").val();
  jQuery("#active_div").val(id);
  jQuery("#bhk_" + active_div).removeClass("active");
  jQuery("#bhk_" + id).addClass("active");
}
function experienceNewHomeImage(id, viewLink, title, btn1Title, viewLink2, btn2Title) {
  jQuery(".img-fluid").removeClass("d-sm-block active");
  jQuery("#VIEW" + id).addClass("d-sm-block active");
  jQuery("#view_btn").html(title);
  
  var btn1Html = '<a href="' + viewLink + '" target="_blank" class="read-more white">' + (btn1Title || 'VIEW NOW') + ' <span class="icon-cta-icon"></span></a>';
  var btn2Html = '';
  if (viewLink2 && viewLink2 !== '') {
      btn2Html = '<a href="' + viewLink2 + '" target="_blank" class="read-more white">' + (btn2Title || 'VIEW NOW') + ' <span class="icon-cta-icon"></span></a>';
  }
  
  jQuery("#view_more_link").html(btn1Html + btn2Html);
}

function viewAllMediaPage(str) {
  jQuery(".card-box-media").removeClass(str);
}

// jQuery(document).ready(function(){
// 	jQuery('a#payment-id').on('click', function(e){
// 		e.preventDefault();
// 		var dtarget = jQuery(this).attr('data-target');
// 		alert(dtarget);
// 	});
// });

// project slid img zoom

jQuery(document).ready(function () {
  console.log("ffsgfgfsggfg 4");
  jQuery("button.img-plus").on("click", function () {
    var dataID = jQuery(this).attr("data-value");
    jQuery(this).attr("data-value", +dataID + 0.1);
    jQuery("button.img-mainus").attr("data-value", +dataID + 0.1);
    if (dataID == 1) {
      $(".flor-zm > img").css("transform", "scale(1.1)");
    } else {
      $(".flor-zm > img").css("transform", "scale(" + dataID + ")");
    }
  });

  jQuery("button.img-mainus").on("click", function () {
    var dataID = jQuery(this).attr("data-value");
    if (dataID > 1) {
      jQuery(this).attr("data-value", dataID - 0.1);
      jQuery("button.img-plus").attr("data-value", dataID - 0.1);
      var count = dataID - 0.1;
      jQuery(".flor-zm > img").css("transform", "scale(" + count + ")");
    } else {
      jQuery(".dragme").css({ left: "0", top: "0" });
    }
  });
});

// menu top cod
jQuery(".menu-list > li > div").mouseover(function () {
  var srcim = jQuery(this).find("img").attr("src");
  var imgsrc = "";
  if (srcim) {
    imgsrc = jQuery(this).find("img").attr("src");
  }

  jQuery(".menu-img img#menu-hover-image").attr("src", imgsrc);
});

jQuery(document).ready(function () {
  console.log("ffsgfgfsggfg 5");
  jQuery("select#cplanType").on("change", function (e) {
    e.preventDefault();
    var cnid = jQuery(this).val();
    var imgg = jQuery("option:selected", this).attr("data-img");
    jQuery.post(
      baseUrl + "/get_accomodation",
      { acnid: cnid },
      function (accdata) {
        if (accdata.length > 2) {
          jQuery("select#florAccom").empty();
          jQuery("select#florAccom").append(
            '<option value="" data-img="">Select Accommodation</option>'
          );
          jQuery("select#florAccom").append(accdata);
          jQuery("select#florAccom").removeAttr("disabled");
          jQuery(".FLooR_plan img.fcimg").attr(
            "src",
            baseUrl + "/sites/default/files/2022-03/floorplan.png"
          );
        } else {
          jQuery("select#florAccom").empty();
          jQuery("select#florAccom").append(
            '<option value="" data-img="">Select Accommodation</option>'
          );
          jQuery("select#floorUnit").empty();
          jQuery("select#floorUnit").append(
            '<option value="">Select Floor/Unit</option>'
          );
          jQuery("select#florAccom").attr("disabled", "disabled");
          jQuery("select#floorUnit").attr("disabled", "disabled");
          jQuery(".FLooR_plan img.fcimg").attr("src", imgg);
        }
      }
    );
  });

  jQuery("select#florAccom").on("change", function (e) {
    e.preventDefault();
    var ciidd = jQuery(this).val();
    var imgg = jQuery("option:selected", this).attr("data-img");

    jQuery.post(
      baseUrl + "/get_floorUnit",
      { acnid: ciidd },
      function (accdata) {
        if (accdata.length > 2) {
          jQuery("select#floorUnit").empty();
          jQuery("select#floorUnit").append(
            '<option value="">Select Floor/Unit</option>'
          );
          jQuery("select#floorUnit").append(accdata);
          jQuery("select#floorUnit").removeAttr("disabled");
          jQuery(".FLooR_plan img.fcimg").attr(
            "src",
            baseUrl + "/sites/default/files/2022-03/floorplan.png"
          );
        } else {
          jQuery("select#floorUnit").empty();
          jQuery("select#floorUnit").append(
            '<option value="">Select Floor/Unit</option>'
          );
          jQuery("select#floorUnit").attr("disabled", "disabled");
          jQuery(".FLooR_plan img.fcimg").attr("src", imgg);
        }
      }
    );
  });

  jQuery("select#floorUnit").on("change", function (e) {
    e.preventDefault();
    var imgg = jQuery("option:selected", this).attr("data-img");
    jQuery(".FLooR_plan img.fcimg").attr("src", imgg);
  });
});

//Core Values txt mobile
jQuery(document).ready(function () {
  if (jQuery(window).width() < 767) {
    jQuery(".core-value-list.nav li").hover(function () {
      setTimeout(function () {
        var txt = jQuery(".core-value .tab-content .active .pad_cor").text();
        //alert(txt);
        jQuery(".core-value-list.nav li p").remove();
        jQuery(".core-value-list.nav li .active")
          .parent("li")
          .append("<p>" + txt + "</p>");
      }, 200);
    });
  }
});
//Core Values txt mobile cl

//for first form
jQuery(document).ready(function () {
  jQuery("#homeForm .form-control, #homeForm .custom-control-input").mouseenter(
    function () {
      jQuery("#homeForm button.btn").removeClass("spin");
    }
  );
});

//for second form
jQuery(document).ready(function () {
  jQuery("#enq_form .form-control, #enq_form .custom-control-input").mouseenter(
    function () {
      jQuery("#enq_form button.btn").removeClass("spin");
    }
  );
});

//form project detail page
jQuery(document).ready(function () {
  let btn1 = jQuery("#enq_form button");
  jQuery(btn1).click(function () {
    jQuery(btn1).addClass("spin");
  });
  setTimeout(function () {
    jQuery(btn1).removeClass("spin");
  }, 70000);
});

function createCookie(name, value, days) {
  name = typeof name != "undefined" ? name : "";
  value = typeof value != "undefined" ? value : "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/;";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null) return "";
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}
getCampaign = getParameterByName("utm_campaign");
getSource = getParameterByName("utm_source");
getMedium = getParameterByName("utm_medium");
getTerm = getParameterByName("utm_term");
if (
  getParameterByName("utm_campaign") != null &&
  getParameterByName("utm_campaign") != "" &&
  readCookie("utm_campaign") == null
) {
  createCookie("utm_campaign", getCampaign);
}
if (
  getParameterByName("utm_source") != null &&
  getParameterByName("utm_source") != "" &&
  readCookie("utm_source") == null
) {
  createCookie("utm_source", getSource);
}
if (
  getParameterByName("utm_medium") != null &&
  getParameterByName("utm_medium") != "" &&
  readCookie("utm_medium") == null
) {
  createCookie("utm_medium", getMedium);
}
if (
  getParameterByName("utm_term") != null &&
  getParameterByName("utm_term") != "" &&
  readCookie("utm_term") == null
) {
  createCookie("utm_term", getTerm);
}
//cookie reset if urls values are changed
if (
  getParameterByName("utm_campaign") != "" &&
  getParameterByName("utm_campaign") != readCookie("utm_campaign")
) {
  createCookie("utm_campaign", getCampaign);
}
if (
  getParameterByName("utm_campaign") != "" &&
  getParameterByName("utm_source") != readCookie("utm_source")
) {
  createCookie("utm_source", getSource);
}
if (
  getParameterByName("utm_campaign") != "" &&
  getParameterByName("utm_medium") != readCookie("utm_medium")
) {
  createCookie("utm_medium", getMedium);
}
if (
  getParameterByName("utm_campaign") != "" &&
  getParameterByName("utm_term") != readCookie("utm_term")
) {
  createCookie("utm_term", getTerm);
}

utmCampaign = readCookie("utm_campaign");
utmSource = readCookie("utm_source");
utmMedium = readCookie("utm_medium");
utmTerm = readCookie("utm_term");

$(".utmSource").attr("value", utmSource);
$(".utmCampaign").attr("value", utmCampaign);
$(".utmMedium").attr("value", utmMedium);
$(".utmTerm").attr("value", utmTerm);

jQuery(document).ready(function () {
  // Rera popup open close
  $(".rera-popup-btn").on("click", function () {
    $(".rera-info-popup").addClass("active");
  });
  $(".close-rera-popup").on("click", function () {
    $(".rera-info-popup").removeClass("active");
  });
  setCountryCode();
});

function setCountryCode() {
  var url = window.location.href;
  var itiInput = $('input[type="tel"]');

  if (typeof window.intlTelInput !== "undefined" && itiInput.length) {
    var countryCode = "in";
    var onlyCountries = null;

    if (url.includes("usa") || url.includes("united-states")) {
      countryCode = "us";
      onlyCountries = ["us", "in"];
    } else if (url.includes("london")) {
      countryCode = "gb";
      onlyCountries = ["gb", "in"];
    } else if (url.includes("gcc")) {
      countryCode = "ae";
      onlyCountries = ["bh", "kw", "om", "qa", "sa", "ae", "in"];
    } else if (url.includes("dubai")) {
      countryCode = "ae";
    } else if (url.includes("hongkong") || url.includes("hong-kong")) {
      countryCode = "hk";
    } else if (url.includes("singapore")) {
      countryCode = "sg";
      onlyCountries = ["sg", "in"];
    } else if (url.includes("canada")) {
      countryCode = "ca";
    } else if (url.includes("australia")) {
      countryCode = "au";
    } else if (url.includes("germany")) {
      countryCode = "de";
    } else if (url.includes("france")) {
      itiInstance.setCountry("fr"); // France
    } else if (url.includes("southafrica") || url.includes("south-africa")) {
      itiInstance.setCountry("za"); // South Africa
    } else if (url.includes("malaysia")) {
      countryCode = "my";
    }

    itiInput.each(function () {
      var currentInstance = window.intlTelInputGlobals.getInstance(this);
      if (currentInstance) {
        currentInstance.destroy();
      }
      var config = {
        initialCountry: countryCode,
        separateDialCode: true,
        utilsScript: "/themes/oberoirealty/js/utils.js",
      };
      if (onlyCountries) {
        config.onlyCountries = onlyCountries;
      }
      var iti = window.intlTelInput(this, config);
      
      // Set initial dial code
      var initialCountryData = iti.getSelectedCountryData();
      if (initialCountryData && initialCountryData.dialCode) {
        var dflag = "+" + initialCountryData.dialCode;
        jQuery("input.cont_code, input#dial_code, input#enq_dial_code").val(dflag);
      }

      this.addEventListener("countrychange", function() {
        var countryData = iti.getSelectedCountryData();
        if (countryData && countryData.dialCode) {
          var dflag = "+" + countryData.dialCode;
          jQuery("input.cont_code, input#dial_code, input#enq_dial_code").val(dflag);
        }
      });
    });
  }
}

// Read email/phone from cookies on thank-you page and push to dataLayer, then clear cookies
(function () {
  function getCookie(name) {
    var match = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return match ? decodeURIComponent(match[1]) : null;
  }
  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
  }
  try {
    var path = (window.location && window.location.pathname) || "";
    if (path.indexOf("/thank-you") !== -1) {
      var email = getCookie("or_userEmail");
      var mobile = getCookie("or_userPhone");
      if (email || mobile) {
        window.dataLayer = window.dataLayer || [];
        
        // Push otp_verified event
        window.dataLayer.push({
          event: "otp_verified",
          userEmail: email || "",
          userPhone: mobile || "",
        });
        
        // Push lead_submit event with enhanced conversion data
        window.dataLayer.push({
          event: "lead_submit",
          enhanced_conversion_data: {
            email: email || "",
            phone_number: "+91" + (mobile || "")
          }
        });
        
        // Clear cookies to avoid duplicate pushes on reload
        deleteCookie("or_userEmail");
        deleteCookie("or_userPhone");
      }
    }
  } catch (e) {}
})();

// Hide cookie consent checkbox for specific URLs
// Show cookie consent checkbox only for specific URLs
// jQuery(document).ready(function () {
//   var showCheckboxUrls = ["/usa", "/london"];

//   var currentPath = window.location.pathname;

//   var shouldShowCheckbox = showCheckboxUrls.some(function (url) {
//     return currentPath.includes(url);
//   });

//   if (shouldShowCheckbox) {
//     jQuery("#cookieConsent").closest(".custom-control.custom-checkbox ").show();
//   } else {
//     jQuery("#cookieConsent").closest(".custom-control.custom-checkbox").hide();
//   }

// });
jQuery(document).ready(function () {
  var showCheckboxUrls = ["/usa", "/london"];
  var currentPath = window.location.pathname;

  var shouldShowCheckbox = showCheckboxUrls.some(function (url) {
    return currentPath.includes(url);
  });

  // Save reference to the checkbox container before removing it
  var $cookieCheckbox = jQuery("#cookieConsent")
    .closest(".custom-control.custom-checkbox")
    .clone(true); // clone with events if any

  // Remove the checkbox initially
  jQuery("#cookieConsent").closest(".custom-control.custom-checkbox").remove();

  // If URL matches, append it back where you want
  if (shouldShowCheckbox) {
    // ✅ append to form or desired container
    jQuery("#enq_form .enqForm-wrapper .row .cookieconsent").append(
      $cookieCheckbox
    );
  }
});

// Footer menu filter functionality
(function () {
  function hideCurrentPageFromFooterMenu() {
    const currentPath = window.location.pathname;
    const footerMenu = document.querySelector("#block-menuthird");

    if (!footerMenu) return;

    // Hide current page links
    const menuLinks = footerMenu.querySelectorAll("a[href]");
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.closest("li").style.display = "none";
      }
    });

    // Hide section titles if all items are hidden
    const sections = footerMenu.querySelectorAll(".list-1 > li");
    sections.forEach((section) => {
      const subList = section.querySelector("ul.list-1");
      if (subList) {
        const visibleItems = Array.from(subList.children).filter(
          (item) => item.style.display !== "none"
        );
        if (visibleItems.length === 0) {
          section.style.display = "none";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      hideCurrentPageFromFooterMenu
    );
  } else {
    hideCurrentPageFromFooterMenu();
  }
})();





// Menu fixed underline

const sections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll(".menu-underline");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});







//Awards start

(()=>{

const section=document.getElementById("awards"),
viewport=document.getElementById("awardsViewport"),
list=document.getElementById("awardsList"),
cards=[...document.querySelectorAll(".award-card")],
next=document.getElementById("awardNext"),
prev=document.getElementById("awardPrev"),
dots=[...document.querySelectorAll(".award-dot")],
discover=document.getElementById("discoverAwards");

if(!section||!viewport||!list||!cards.length)return;

let current=0;
let busy=false;
let touchY=0;
let touchActive=false;

const step=()=>{
const h=cards[0].getBoundingClientRect().height;
const g=parseFloat(getComputedStyle(list).gap)||0;
return h+g;
};

const maxIndex=()=>cards.length-2;

function update(){
const pos=Math.min(current,maxIndex());

list.style.transform=`translate3d(0,-${pos*step()}px,0)`;

cards.forEach((c,i)=>c.classList.toggle("active",i===current));
dots.forEach((d,i)=>d.classList.toggle("active",i===current));

prev.disabled=current===0;
next.disabled=current===cards.length-1;
}

function move(dir){
if(dir>0){
if(current>=cards.length-1)return false;
current++;
}else{
if(current<=0)return false;
current--;
}
update();
return true;
}

function inSection(){
const r=section.getBoundingClientRect(),h=innerHeight;
return r.top<h*.78&&r.bottom>h*.22;
}

/*
 IMPORTANT:
 Wheel is attached to the WHOLE SECTION.
 Therefore the cursor can be anywhere inside the
 awards section and the cards will still advance.
*/
section.addEventListener("wheel",e=>{

if(Math.abs(e.deltaY)<3||!inSection())return;

const down=e.deltaY>0;

if(down){

/* Last card = release browser/page scroll */
if(current===cards.length-1){
busy=false;
return;
}

e.preventDefault();

if(busy)return;

busy=true;
move(1);

setTimeout(()=>busy=false,620);

}else{

/* First card = release browser/page scroll */
if(current===0){
busy=false;
return;
}

e.preventDefault();

if(busy)return;

busy=true;
move(-1);

setTimeout(()=>busy=false,620);
}

},{passive:false});

/* Touch */
viewport.addEventListener("touchstart",e=>{
if(e.touches.length)touchY=e.touches[0].clientY;
touchActive=true;
},{passive:true});

viewport.addEventListener("touchend",e=>{
if(!touchActive||!e.changedTouches.length)return;

const y=e.changedTouches[0].clientY;
const d=touchY-y;

touchActive=false;

if(Math.abs(d)<35)return;

if(d>0){
if(current<cards.length-1)move(1);
}else{
if(current>0)move(-1);
}
},{passive:true});

/* Buttons */
next.addEventListener("click",()=>move(1));
prev.addEventListener("click",()=>move(-1));

/* Dots */
dots.forEach(d=>{
d.addEventListener("click",()=>{
const i=+d.dataset.index;
if(i>=0&&i<cards.length){
current=i;
update();
}
});
});

/* Keyboard */
viewport.addEventListener("keydown",e=>{
if(e.key==="ArrowDown"||e.key==="PageDown"){
if(current<cards.length-1){
e.preventDefault();
move(1);
}
}
if(e.key==="ArrowUp"||e.key==="PageUp"){
if(current>0){
e.preventDefault();
move(-1);
}
}
});

/* Discover */
discover?.addEventListener("click",()=>{
viewport.scrollIntoView({behavior:"smooth",block:"center"});
setTimeout(()=>viewport.focus({preventScroll:true}),700);
});

/* Resize */
let resizeTimer;
addEventListener("resize",()=>{
clearTimeout(resizeTimer);
resizeTimer=setTimeout(update,100);
});

/* Reveal */
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
section.classList.add("active");
observer.unobserve(section);
}
});
},{threshold:.12});

observer.observe(section);

update();

})();

//Awards end