document.addEventListener("touchstart", function() {}, false);
(function($) {
    "use strict";
    var randNumber_1 = parseInt(Math.ceil(Math.random() * 15), 10);
    var randNumber_2 = parseInt(Math.ceil(Math.random() * 15), 10);
    humanCheckCaptcha(randNumber_1, randNumber_2);
    function humanCheckCaptcha(randNumber_1, randNumber_2) {
        $("#humanCheckCaptchaBox").html("Solve The Math ");
        $("#firstDigit").html('<input name="mathfirstnum" id="mathfirstnum" class="form-control" type="text" value="' + randNumber_1 + '" readonly>');
        $("#secondDigit").html('<input name="mathsecondnum" id="mathsecondnum" class="form-control" type="text" value="' + randNumber_2 + '" readonly>');
    }
    $('#estimated-launch-date input').datepicker({
        format: "dd MM, yyyy",
        startDate: "0d",
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
    });
    $("#QuoteForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Please fill in the form properly!");
            sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
        } else {
            var mathPart_1 = parseInt($("#mathfirstnum").val(), 10);
            var mathPart_2 = parseInt($("#mathsecondnum").val(), 10);
            var correctMathSolution = parseInt((mathPart_1 + mathPart_2), 10);
            var inputHumanAns = $("#humanCheckCaptchaInput").val();
            if (inputHumanAns == correctMathSolution) {
                event.preventDefault();
                submitForm();
            } else {
                submitMSG(false, "Please solve Human Captcha!!!");
                sweetAlert("Oops...", "Please solve Human Captcha!!!", "error");
                return false;
            }
        }
    });
    function submitForm() {
        var form_data = new FormData($("#QuoteForm")[0]);
        form_data.append('file', form_data);
        $('#loading-image').show();
        $('#final-step-buttons').hide();
        $.ajax({
            type: "POST",
            url: "quote-cond-multifile-attached.php",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            },
            complete: function() {
                $('#loading-image').hide();
                $('#final-step-buttons').show();
            }
        });
    }
    $(document).on('change', ':file', function() {
        var input = $(this)
          , numFiles = input.get(0).files ? input.get(0).files.length : 1
          , label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $(':file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.form-group').find(':text')
          , log = numFiles > 1 ? numFiles + ' files selected' : label;
        if (input.length) {
            input.val(log);
        } else {
            if (log)
                alert(log);
        }
    });
    function formSuccess() {
        $("#QuoteForm")[0].reset();
        submitMSG(true, "Your Quote Request Submitted Successfully!");
        swal("Good job!", "Your Quote Request Submitted Successfully!!!", "success");
    }
    function formError() {
        $(".help-block.with-errors").removeClass('hidden');
    }
    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center text-success";
            $("#final-step-buttons").html('<div class="h3 text-center text-success"> Tahnk you for your concern Quote Request. We will get back to you soon!</div>');
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#mgsContactSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}
)(jQuery);
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
$(function() {
    $("#android-services-box").css('display', 'none');
    $("#apple-services-box").css('display', 'none');
    $("#windows-services-box").css('display', 'none');
    $("input[name='opsys']").on("click", function() {
        var opsys = $('input[name=opsys]:checked').val();
        if (opsys == "Android") {
            $("#android-services-box").css('display', 'block');
            $("#apple-services-box").css('display', 'none');
            $("#windows-services-box").css('display', 'none');
        } else if (opsys == "Apple") {
            $("#apple-services-box").css('display', 'block');
            $("#android-services-box").css('display', 'none');
            $("#windows-services-box").css('display', 'none');
        } else {
            $("#windows-services-box").css('display', 'block');
            $("#apple-services-box").css('display', 'none');
            $("#android-services-box").css('display', 'none');
        }
    });
});
function nextStep2() {
    var opsys = $('input[name=opsys]:checked').val();
    var androidreqsevice = $("#androidreqsevice").val();
    var androidreqfeatures = $("#androidreqfeatures").val();
    var applereqsevice = $("#applereqsevice").val();
    var applereqfeatures = $("#applereqfeatures").val();
    var windowsreqsevice = $("#windowsreqsevice").val();
    var windowsreqfeatures = $("#windowsreqfeatures").val();
    if (opsys)
        $(".validopsys .help-block.with-errors").html('');
    else
        $(".validopsys .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select OS</li></ul>');
    if (opsys == "Android") {
        var opsysandroidpart = '';
        if (androidreqsevice)
            $(".validandroidreqsevice .help-block.with-errors").html('');
        else
            $(".validandroidreqsevice .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Android Service</li></ul>');
        if (androidreqfeatures)
            $(".validandroidreqfeatures .help-block.with-errors").html('');
        else
            $(".validandroidreqfeatures .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Android Features</li></ul>');
        if (androidreqsevice && androidreqfeatures) {
            var opsysandroidpart = 1;
        }
    } else if (opsys == "Apple") {
        var opsysapplepart = '';
        if (applereqsevice)
            $(".validapplereqsevice .help-block.with-errors").html('');
        else
            $(".validapplereqsevice .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Apple Service</li></ul>');
        if (applereqfeatures)
            $(".validapplereqfeatures .help-block.with-errors").html('');
        else
            $(".validapplereqfeatures .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Apple Features</li></ul>');
        if (applereqsevice && applereqfeatures) {
            var opsysapplepart = 1;
        }
    } else {
        var opsyswindowspart = '';
        if (windowsreqsevice)
            $(".validwindowsreqsevice .help-block.with-errors").html('');
        else
            $(".validwindowsreqsevice .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Windows Service</li></ul>');
        if (windowsreqfeatures)
            $(".validwindowsreqfeatures .help-block.with-errors").html('');
        else
            $(".validwindowsreqfeatures .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Windows Features</li></ul>');
        if (windowsreqsevice && windowsreqfeatures) {
            var opsyswindowspart = 1;
        }
    }
    if (opsys == "Android")
        var opsysselectfieldpart = opsysandroidpart;
    else if (opsys == "Apple")
        var opsysselectfieldpart = opsysapplepart;
    else
        var opsysselectfieldpart = opsyswindowspart;
    if (opsys && opsysselectfieldpart) {
        $("#section-1 .help-block.with-errors").html('');
        $("#section-1").removeClass("open");
        $("#section-1").addClass("slide-left");
        $("#section-2").removeClass("slide-right");
        $("#section-2").addClass("open");
    } else {
        $("#section-1 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-1 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
    }
}
function previousStep1() {
    $("#section-1").removeClass("slide-left");
    $("#section-1").addClass("open");
    $("#section-2").removeClass("open");
    $("#section-2").addClass("slide-right");
}
function nextStep3() {
    var probudget = $("#probudget").val();
    var priority = $('input[name=priority]:checked').val();
    var launchdate = $("#launchdate").val();
    var compatiblebrowser = '';
    $('.validcompatiblebrowsers input[type=checkbox]:checked').each(function() {
        var cbrwvalues = $(this).val();
        compatiblebrowser += cbrwvalues + ', ';
    });
    var compatiblebrowsers = compatiblebrowser.slice(0, -2);
    if (probudget)
        $(".validprobudget .help-block.with-errors").html('');
    else
        $(".validprobudget .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Budget</li></ul>');
    if (priority)
        $(".validpriority .help-block.with-errors").html('');
    else
        $(".validpriority .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Priority</li></ul>');
    if (launchdate)
        $(".validlaunchdate .help-block.with-errors").html('');
    else
        $(".validlaunchdate .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Launch Date</li></ul>');
    if (compatiblebrowsers)
        $(".validcompatiblebrowsers .help-block.with-errors").html('');
    else
        $(".validcompatiblebrowsers .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Compatible Browsers</li></ul>');
    if (probudget && priority && launchdate && compatiblebrowsers) {
        $("#section-2 .help-block.with-errors.mandatory-error").html('');
        $("#section-2").removeClass("open");
        $("#section-2").addClass("slide-left");
        $("#section-3").removeClass("slide-right");
        $("#section-3").addClass("open");
    } else {
        $("#section-2 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-2 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
    }
}
function previousStep2() {
    $("#section-2").removeClass("slide-left");
    $("#section-2").addClass("open");
    $("#section-3").removeClass("open");
    $("#section-3").addClass("slide-right");
}
function nextStep4() {
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var gender = $("#gender").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var validemail = isEmail(email);
    if (fname)
        $(".validfname .help-block.with-errors").html('');
    else
        $(".validfname .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter First Name</li></ul>');
    if (lname)
        $(".validlname .help-block.with-errors").html('');
    else
        $(".validlname .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter Last Name</li></ul>');
    if (gender)
        $(".validgender .help-block.with-errors").html('');
    else
        $(".validgender .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Gender</li></ul>');
    if (address)
        $(".validaddress .help-block.with-errors").html('');
    else
        $(".validaddress .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter Address</li></ul>');
    if (validemail)
        $(".validemail .help-block.with-errors").html('');
    else
        $(".validemail .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter valid email</li></ul>');
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(phone)) {
        $(".validphone .help-block.with-errors").html('');
        var validphone = 1;
    } else {
        $(".validphone .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter valid Phone</li></ul>');
        var validphone = 0;
    }
    if (fname.length > 0 && fname && lname.length > 0 && lname && gender && address.length > 0 && address && validemail && phone.length > 4 && validphone > 0) {
        $("#section-3 .help-block.with-errors.mandatory-error").html('');
        $("#section-3").removeClass("open");
        $("#section-3").addClass("slide-left");
        $("#section-4").removeClass("slide-right");
        $("#section-4").addClass("open");
    } else {
        $("#section-3 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-3 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
    }
}
function previousStep3() {
    $("#section-3").removeClass("slide-left");
    $("#section-3").addClass("open");
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-right");
}
function nextStep5() {
    var opsys = $('input[name=opsys]:checked').val();
    var androidreqsevice = $("#androidreqsevice").val();
    var androidreqfeatures = $("#androidreqfeatures").val();
    var applereqsevice = $("#applereqsevice").val();
    var applereqfeatures = $("#applereqfeatures").val();
    var windowsreqsevice = $("#windowsreqsevice").val();
    var windowsreqfeatures = $("#windowsreqfeatures").val();
    var probudget = $("#probudget").val();
    var priority = $('input[name=priority]:checked').val();
    var launchdate = $("#launchdate").val();
    var compatiblebrowser = '';
    $('.validcompatiblebrowsers input[type=checkbox]:checked').each(function() {
        var cbrwvalues = $(this).val();
        compatiblebrowser += cbrwvalues + ', ';
    });
    var compatiblebrowsers = compatiblebrowser.slice(0, -2);
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var gender = $("#gender").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var attachedFile = $("#attachedFile").val();
    var requirementdetails = $("#requirementdetails").val();
    var additionalinfo = $("#additionalinfo").val();
    var preferedcontact = $('input[name=preferedcontact]:checked').val();
    $("#osData").html('<strong>Selected OS:</strong> ' + opsys);
    if (opsys == "Android") {
        $("#androidserviceData").html('<strong>Selected Android Service:</strong> ' + androidreqsevice);
        $("#androidreqfeaturesData").html('<strong>Selected Android Features:</strong> ' + androidreqfeatures);
    } else if (opsys == "Apple") {
        $("#appleserviceData").html('<strong>Selected Apple Service:</strong> ' + applereqsevice);
        $("#applereqfeaturesData").html('<strong>Selected Apple Features:</strong> ' + applereqfeatures);
    } else {
        $("#windowsserviceData").html('<strong>Selected Windows Service:</strong> ' + windowsreqsevice);
        $("#windowsreqfeaturesData").html('<strong>Selected Windows Features:</strong> ' + windowsreqfeatures);
    }
    $("#probudgetData").html('<strong>Project Budget:</strong> ' + probudget);
    $("#priorityData").html('<strong>priority:</strong> ' + priority);
    $("#launchdateData").html('<strong>Estimated Launch Date:</strong> ' + launchdate);
    $("#compatiblebrowsersData").html('<strong>Compatible Browsers:</strong> ' + compatiblebrowsers);
    $("#firstNameData").html('<strong>First Name:</strong> ' + fname);
    $("#lastNameData").html('<strong>Last Name:</strong> ' + lname);
    $("#genderData").html('<strong>Gender:</strong> ' + gender);
    $("#addressData").html('<strong>Address:</strong> ' + address);
    $("#emailaddressData").html('<strong>email:</strong> ' + email);
    $("#phoneData").html('<strong>Phone:</strong> ' + phone);
    $("#requirementdetailsData").html('<strong>Requirement Details:</strong> ' + requirementdetails);
    $("#additionalinfoData").html('<strong>Additional Info:</strong> ' + additionalinfo);
    $("#preferedcontactData").html('<strong>Prefered Contact Method:</strong> ' + preferedcontact);
    if (preferedcontact)
        $(".validpreferedcontact .help-block.with-errors").html('');
    else
        $(".validpreferedcontact .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select Prefered Contact Method</li></ul>');
    if (requirementdetails.length > 0 && requirementdetails)
        $(".validreqdetails .help-block.with-errors").html('');
    else
        $(".validreqdetails .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Provide Requirement Details</li></ul>');
    if ($('#aggre').is(":checked"))
        $(".validagree .help-block.with-errors").html('');
    else
        $(".validagree .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Aggre with terms &amp; conditions</li></ul>');
    if (preferedcontact && requirementdetails.length > 0 && requirementdetails && $('#aggre').is(":checked")) {
        $("#section-4 .help-block.with-errors.mandatory-error").html('');
        $("#section-4").removeClass("open");
        $("#section-4").addClass("slide-left");
        $("#section-5").removeClass("slide-right");
        $("#section-5").addClass("open");
    } else {
        $("#section-4 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-4 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
    }
}
function previousStep4() {
    $("#section-4").removeClass("slide-left");
    $("#section-4").addClass("open");
    $("#section-5").removeClass("open");
    $("#section-5").addClass("slide-right");
}
