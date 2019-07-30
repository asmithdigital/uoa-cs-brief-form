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
        $("#mgsContactSubmit").html('');
        $("#final-step-buttons").html('<div class="h3 text-center text-success"> You have finished all steps of this html form successfully!!! </div>');
        swal("Good job!", "You have finished all steps of this html form successfully!!!", "success");
    }
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $(':file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.form-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
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
})(jQuery);

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(function() {
    $("#stepOne").css('display', 'none');
    $("#stepOneFast").css('display', 'none');
    $("input[name='opsys']").on("click", function() {
        var opsys = $('input[name=opsys]:checked').val();
        if (opsys == "Android") {
            $("#stepOne").css('display', 'block');
            $("#stepOneFast").css('display', 'none');
        } else {
            $("#stepOneFast").css('display', 'block');
            $("#stepOne").css('display', 'none');
        }
    });
});

function nextStep2() {
    $("#progress").css('width', "25%").find(".progress-bar-text").html('25% Complete');
    $("#section-1 .help-block.with-errors").html('');
    $("#section-1").removeClass("open");
    $("#section-1").addClass("slide-left");
    $("#section-2").removeClass("slide-right");
    $("#section-2").addClass("open");
}

function previousStep1() {
    $("#progress").css('width', "0%").find(".progress-bar-text").html('0% Complete');;
    $("#section-1").removeClass("slide-left");
    $("#section-1").addClass("open");
    $("#section-2").removeClass("open");
    $("#section-2").addClass("slide-right");
}

function nextStep3() {
    var testValue1 = $('#test1').val();
    var testValue2 = $('#test2').val();
    var testValue3 = $('input[name=first]:checked').val();
    if (testValue1) $(".validtest1 .help-block.with-errors").html('');
    else
        $(".validtest1 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter a value 1</li></ul>');
    if (testValue2) $(".validtest2 .help-block.with-errors").html('');
    else
        $(".validtest2 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please enter a value 2</li></ul>');
    if (testValue3) $(".validtest3 .help-block.with-errors").html('');
    else
        $(".validtest3 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select one option</li></ul>');
    if (testValue1 && testValue2 && testValue3) {

        $("#progress").css('width', "50%").find(".progress-bar-text").html('50% Complete');;

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

    $("#progress").css('width', "25%").find(".progress-bar-text").html('25% Complete');

    $("#section-2").removeClass("slide-left");
    $("#section-2").addClass("open");
    $("#section-3").removeClass("open");
    $("#section-3").addClass("slide-right");
}

function nextStep4() {

    $("#progress").css('width', "75%").find(".progress-bar-text").html('75% Complete');;

    $("#section-3 .help-block.with-errors.mandatory-error").html('');
    $("#section-3").removeClass("open");
    $("#section-3").addClass("slide-left");
    $("#section-4").removeClass("slide-right");
    $("#section-4").addClass("open");
}

function previousStep3() {

    $("#progress").css('width', "50%").find(".progress-bar-text").html('50% Complete');;

    $("#section-3").removeClass("slide-left");
    $("#section-3").addClass("open");
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-right");
}

function nextStep5() {

    $("#progress").css('width', "100%").find(".progress-bar-text").html('100% Complete');;

    var test = $('#result').val();
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

    $("#testData").html('<strong>Test:</strong> ' + test);
    $("#probudgetData").html('<strong>Project Budget:</strong> ' + probudget);
    $("#priorityData").html('<strong>priority:</strong> ' + priority);
    $("#launchdateData").html('<strong>Estimated Launch Date:</strong> ' + launchdate);
    $("#firstNameData").html('<strong>First Name:</strong> ' + fname);
    $("#lastNameData").html('<strong>Last Name:</strong> ' + lname);
    $("#genderData").html('<strong>Gender:</strong> ' + gender);
    $("#addressData").html('<strong>Address:</strong> ' + address);
    $("#emailaddressData").html('<strong>email:</strong> ' + email);
    $("#phoneData").html('<strong>Phone:</strong> ' + phone);
    $("#requirementdetailsData").html('<strong>Requirement Details:</strong> ' + requirementdetails);
    $("#additionalinfoData").html('<strong>Additional Info:</strong> ' + additionalinfo);
    $("#preferedcontactData").html('<strong>Prefered Contact Method:</strong> ' + preferedcontact);

    $("#section-4 .help-block.with-errors.mandatory-error").html('');
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-left");
    $("#section-5").removeClass("slide-right");
    $("#section-5").addClass("open");

    $("#backto4").css('display', 'block');
    $("#backto1").css('display', 'none');
}

function previousStep4() {

    $("#progress").css('width', "75%").find(".progress-bar-text").html('75% Complete');;

    $("#section-4").removeClass("slide-left");
    $("#section-4").addClass("open");
    $("#section-5").removeClass("open");
    $("#section-5").addClass("slide-right");
}

function nextStep5Fast() {
    $("#progress").css('width', "100%").find(".progress-bar-text").html('100% Complete');
    $("#section-1 .help-block.with-errors").html('');
    $("#section-1").removeClass("open");
    $("#section-1").addClass("slide-left");
    $("#section-5").removeClass("slide-right");
    $("#section-5").addClass("open");

    $("#backto4").css('display', 'none');
    $("#backto1").css('display', 'block');

}

function previousStep1Fast() {
    $("#progress").css('width', "0%").find(".progress-bar-text").html('0% Complete');
    $("#section-1").removeClass("slide-left");
    $("#section-1").addClass("open");
    $("#section-5").removeClass("open");
    $("#section-5").addClass("slide-right");
}
