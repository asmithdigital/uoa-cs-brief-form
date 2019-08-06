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
    $('#launchdate').datepicker({
        format: "dd MM, yyyy",
        startDate: "0d",
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
    });
    $("#QuoteForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Please complete all the required form fields!");
            sweetAlert("Oops...", "Please complete all the required form fields!", "error");
        } else {
            var mathPart_1 = parseInt($("#mathfirstnum").val(), 10);
            var mathPart_2 = parseInt($("#mathsecondnum").val(), 10);
            var correctMathSolution = parseInt((mathPart_1 + mathPart_2), 10);
            var inputHumanAns = $("#humanCheckCaptchaInput").val();
            if (inputHumanAns == correctMathSolution) {
                event.preventDefault();
                submitForm();
            } else {
                submitMSG(false, "Please solve math problem!");
                sweetAlert("Oops...", "Please solve math problem!", "error");
                return false;
            }
        }
    });

    function devsubmitForm() {
        $("#mgsContactSubmit").html('').css('display', 'none');
        $("#final-step-buttons").html('<div class="alert alert-success h3">You have finished all steps of this html form successfully!!!</div>');
        swal("Good job!", "You have finished all steps of this html form successfully!!!", "success");
        $("#progress").css('width', "100%").find(".progress-bar-text").html('100% Complete');
    }
    function submitForm() {
        var form_data = new FormData($("#QuoteForm")[0]);
        form_data.append('file', form_data);
        $('#loading-image').show();
        $('#final-step-buttons').hide();

        // https://www.youtube.com/watch?v=ykrupgQgmkA
        let testForm = document.querySelector("#QuoteForm");              
        const formData = new FormData(testForm);
        fetch(testForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.status == 200) {
                console.log(response);
                formSuccess();
            } else {
                formError();
                submitMSG(false, response);
            }
        });

        // $.ajax({
        //     type: "POST",
        //     url: "/pages/success",
        //     data: form_data,
        //     processData: false,
        //     contentType: false,
        //     success: function(text) {
                
        //         console.log(text);


        //         if (text === "success") {
        //             formSuccess();
        //         } else {
        //             formError();
        //             submitMSG(false, text);
        //         }
        //     },
        //     complete: function() {
        //         $('#loading-image').hide();
        //         $('#final-step-buttons').show();
        //     }
        // });
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
            var msgClasses = "alert alert-success h3";
            $("#final-step-buttons").html('<div class="alert alert-success h3">Thank you for your Quote Request. We will get back to you soon!</div>');
        } else {
            var msgClasses = "alert alert-danger h3";
        }
        $("#mgsContactSubmit").removeClass().addClass(msgClasses).text(msg);
    }
})(jQuery);

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function summaryHiddenType() {

}

// Toggle the fast track next button
$(function() {
    var firstStepInputvalue = $('#firstStep').val();

    // Set initial value of Type summary on page load
    $("#categoryData").html('<strong>Type: 3</strong>');

    $("input[name='preoptions']").on("click", function() {
        var total = 0;

        $('input[name=preoptions]:checked').each(function () {
            total += +this.value;
        });

        if (total == 3) {
            firstStepInputvalue = 3;
            $("#categoryData").html('<strong>Type: 2</strong>');

            $('#introexistingCreativeContainer').css('display', 'block');
            $('#stepOneFast button').addClass('disabled');
        }
        else {
            $("#categoryData").html('<strong>Type: 3</strong>');
            $('#introexistingCreativeContainer').css('display', 'none');
            $('#summaryFastTrack3').css('display', 'block');
            $('#summaryFastTrack2').css('display', 'none');
            $("#stepOne").css('display', 'none');
            $("#stepOneFast").css('display', 'block');
            $('#stepOneFast button').removeClass('disabled');

            $('input[name=introexistingCreative]').prop('checked', false);
        }
    });

    $('input[name=introexistingCreative]').on('click', function() {
        var introexistingCreative = $('input[name=introexistingCreative]:checked').val();
        if (introexistingCreative == 1) {
            $("#stepOne").css('display', 'none');
            $("#stepOneFast").css('display', 'block');
            $('#stepOneFast button').removeClass('disabled');
            $('#summaryFastTrack3').css('display', 'none');
            $('#summaryFastTrack2').css('display', 'block');
        }
        else {
            $("#stepOne").css('display', 'block');
            $("#stepOneFast").css('display', 'none');
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

    // Scroll to top of next stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function previousStep1() {
    $("#progress").css('width', "0%").find(".progress-bar-text").html('0% Complete');;
    $("#section-1").removeClass("slide-left");
    $("#section-1").addClass("open");
    $("#section-2").removeClass("open");
    $("#section-2").addClass("slide-right");

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function nextStep3() {
    var validreach1 = $('#reachAudience').val();
    var validreach2 = $('input[name=reach-disciplines]:checked').val();
    var validreach3 = $('input[name=reach-valuable]:checked').val();
    var validreach4 = $('#reachMediaSpend').val();
    if (validreach1) $(".validreach1 .help-block.with-errors").html('');
    else
        $(".validreach1 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select the size of your audience</li></ul>');
    if (validreach2) $(".validreach2 .help-block.with-errors").html('');
    else
        $(".validreach2 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validreach3) $(".validreach3 .help-block.with-errors").html('');
    else
        $(".validreach3 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validreach4) $(".validreach4 .help-block.with-errors").html('');
    else
        $(".validreach4 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select paid media spend</li></ul>');
    if (validreach1 && validreach2 && validreach3 && validreach4) {
        $("#progress").css('width', "50%").find(".progress-bar-text").html('50% Complete');
        $("#section-2 .help-block.with-errors.mandatory-error").html('');
        $("#section-2").removeClass("open");
        $("#section-2").addClass("slide-left");
        $("#section-3").removeClass("slide-right");
        $("#section-3").addClass("open");

        // Scroll to top of next stage
        $('html,body').animate({
            scrollTop: $("#QuoteForm").offset().top - 80
        }, 'slow');

    } else {
        $("#section-2 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please complete all the required form fields</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-2 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please complete all the required form fields!", "error");
    } 
}

function previousStep2() {
    $("#progress").css('width', "25%").find(".progress-bar-text").html('25% Complete');
    $("#section-2").removeClass("slide-left");
    $("#section-2").addClass("open");
    $("#section-3").removeClass("open");
    $("#section-3").addClass("slide-right");

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#section-2 .help-block.with-errors.mandatory-error").offset().top - 80
    }, 'slow');
}

function nextStep4() {
    var validreturn1 = $('input[name=return-size-result]:checked').val();
    var validreturn2 = $('input[name=return-measure]:checked').val();
    var validreturn3 = $('input[name=return-size-investment]:checked').val();
    if (validreturn1) $(".validreturn1 .help-block.with-errors").html('');
    else
        $(".validreturn1 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validreturn2) $(".validreturn2 .help-block.with-errors").html('');
    else
        $(".validreturn2 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validreturn3) $(".validreturn3 .help-block.with-errors").html('');
    else
        $(".validreturn3 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validreturn1 && validreturn2 && validreturn3) {
        $("#progress").css('width', "75%").find(".progress-bar-text").html('75% Complete');;
        $("#section-3 .help-block.with-errors.mandatory-error").html('');
        $("#section-3").removeClass("open");
        $("#section-3").addClass("slide-left");
        $("#section-4").removeClass("slide-right");
        $("#section-4").addClass("open");

        // Scroll to top of next stage
        $('html,body').animate({
            scrollTop: $("#QuoteForm").offset().top - 80
        }, 'slow');
    } else {
        $("#section-3 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please complete all the required form fields</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-3 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please complete all the required form fields!", "error");
    } 
}

function previousStep3() {
    $("#progress").css('width', "50%").find(".progress-bar-text").html('50% Complete');;
    $("#section-3").removeClass("slide-left");
    $("#section-3").addClass("open");
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-right");

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function nextStep5() {
    var validdelivery1 = $('input[name=delivery-innovate]:checked').val();
    var validdelivery2 = $('input[name=delivery-complex]:checked').val();
    var validdelivery3 = $('input[name=delivery-external]:checked').val();
    var validdelivery4 = $('input[name=delivery-longevity]:checked').val();
    if (validdelivery1) $(".validdelivery1 .help-block.with-errors").html('');
    else
        $(".validdelivery1 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validdelivery2) $(".validdelivery2 .help-block.with-errors").html('');
    else
        $(".validdelivery2 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validdelivery3) $(".validdelivery3 .help-block.with-errors").html('');
    else
        $(".validdelivery3 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please select an option</li></ul>');
    if (validdelivery4) $(".validdelivery4 .help-block.with-errors").html('');
    else
        $(".validdelivery4 .help-block.with-errors").html('<ul class="list-unstyled"><li>Please Select one option</li></ul>');
    if (validdelivery1 && validdelivery2 && validdelivery3 && validdelivery4) {
        $("#progress").css('width', "80%").find(".progress-bar-text").html('80% Complete');;
        $("#section-4 .help-block.with-errors.mandatory-error").html('');
        $("#section-4").removeClass("open");
        $("#section-4").addClass("slide-left");
        $("#section-5").removeClass("slide-right");
        $("#section-5").addClass("open");

        // Scroll to top of next stage
        $('html,body').animate({
            scrollTop: $("#QuoteForm").offset().top - 80
        }, 'slow');
    } else {
        $("#section-4 .help-block.with-errors.mandatory-error").html('<ul class="list-unstyled"><li>Please complete all the required form fields</li></ul>');
        $('html,body').animate({
            scrollTop: $("#section-3 .help-block.with-errors.mandatory-error").offset().top - 80
        }, 'slow');
        sweetAlert("Oops...", "Please complete all the required form fields!", "error");
    } 
}

function previousStep4() {
    $("#progress").css('width', "75%").find(".progress-bar-text").html('75% Complete');;
    $("#section-4").removeClass("slide-left");
    $("#section-4").addClass("open");
    $("#section-6").removeClass("open");
    $("#section-6").addClass("slide-right");

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function nextStep6() {

    $("#progress").css('width', "99%").find(".progress-bar-text").html('99% Complete');;

    var testTotalofTTotal = $('#testTotalofTTotal').val();
    
    // Personal details data
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

    //  Print data to summary
    $("#testData1").html('<h1>Total: ' + testTotalofTTotal + '</h1>');

    // Personal details
    $("#probudgetData").html('<strong>Project Budget:</strong> ' + probudget);
    $("#priorityData").html('<strong>Priority:</strong> ' + priority);
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
    
    // Scroll
    $("#section-4 .help-block.with-errors.mandatory-error").html('');
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-left");
    $("#section-6").removeClass("slide-right");
    $("#section-6").addClass("open");

    // Scroll to top of next stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');

    // Hide fast scroll track button
    $(".backto5").css('display', 'inline-block');
    $(".backto5Content").css('display', 'block');
    $(".backto1, .backto1Content").css('display', 'none');

    // Toggle the Summary type
    if (testTotalofTTotal < 70) {
        $("#categoryData").html('<strong>Type: 2</strong> Based on score: <strong>' + testTotalofTTotal + '</strong>');
        $('#summaryTrack1').css('display', 'none');
        $('#summaryTrack2').css('display', 'block');
    }
    else if (testTotalofTTotal >= 70) {
        $("#categoryData").html('<strong>Type: 1</strong> Based on score: <strong>' + testTotalofTTotal + '</strong>');
        $('#summaryTrack1').css('display', 'block');
        $('#summaryTrack2').css('display', 'none');
    }
}

function previousStep5() {
    $("#progress").css('width', "80%").find(".progress-bar-text").html('80% Complete');;
    $("#section-5").removeClass("slide-left");
    $("#section-5").addClass("open");
    $("#section-6").removeClass("open");
    $("#section-6").addClass("slide-right");

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function nextStep6Fast() {

    $("#progress").css('width', "100%").find(".progress-bar-text").html('100% Complete');
    $("#section-1 .help-block.with-errors").html('');
    $("#section-1").removeClass("open");
    $("#section-1").addClass("slide-left");
    $("#section-2").removeClass("slide-right");
    $("#section-2").addClass("slide-left");
    $("#section-3").removeClass("slide-right");
    $("#section-3").addClass("slide-left");
    $("#section-4").removeClass("slide-right");
    $("#section-4").addClass("slide-left");
    $("#section-5").removeClass("slide-right");
    $("#section-5").addClass("slide-left");
    $("#section-6").removeClass("slide-right");
    $("#section-6").addClass("open");
    $(".backto5, .backto5Content").css('display', 'none');
    $(".backto1").css('display', 'inline-block');
    $(".backto1Content").css('display', 'block');

    // Scroll to top of previous stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}

function previousStep1Fast() {
    $("#progress").css('width', "0%").find(".progress-bar-text").html('0% Complete');
    $("#section-1").removeClass("slide-left");
    $("#section-1").addClass("open");
    $("#section-2").removeClass("slide-left");
    $("#section-2").addClass("slide-right");
    $("#section-3").removeClass("slide-left");
    $("#section-3").addClass("slide-right");
    $("#section-4").removeClass("slide-left");
    $("#section-4").addClass("slide-right");
    $("#section-5").removeClass("slide-left");
    $("#section-5").addClass("slide-right");
    $("#section-6").removeClass("open");
    $("#section-6").addClass("slide-right");

    // Scroll to top of next stage
    $('html,body').animate({
        scrollTop: $("#QuoteForm").offset().top - 80
    }, 'slow');
}
