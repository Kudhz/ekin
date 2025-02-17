const base = {};
$(document).ready(function () {

    setNavigation();

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    if($().scrollUp){
        $.scrollUp();

        $.scrollUp({
            animation: 'slide',
            activeOverlay: '#00FFFF'
        });
    }

    base.config = {
        validator: {
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label text-danger mt-2',
            successClass: 'validation-valid-label',
            validClass: 'validation-valid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            // success: function(label) {
            //     label.addClass('validation-valid-label').text('Success.'); // remove to hide Success message
            // },
            // Different components require proper error label placement
            errorPlacement: function (error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                else if (element.parents().hasClass('custom-control')) {
                    error.appendTo(element.parents('.custom-control').parent().parent().parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
        }
    };

    $.validator.setDefaults(base.config.validator);

    $(document.body).on('show.bs.modal', function () {
        $(window.document).find('html').addClass('modal-open');
    });

    $(document.body).on('hide.bs.modal', function () {
        $(window.document).find('html').removeClass('modal-open');
    });

    if (cekElement(".search-keyword")){
        $('.search-keyword').focus();
    }

    if (cekElement(".keyFontUp")){
        $('.keyFontUp').bind("keyup focusout", function () {
            this.value = this.value.toLocaleUpperCase();
        });
    }

    if (cekElement(".keyFontLow")){
        $('.keyFontLow').bind("keyup focusout", function () {
            this.value = this.value.toLocaleUpperCase();
        });
    }

    if (cekElement(".onlyNumber")){
        $('.onlyNumber').keypress(function(event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    }

    if (cekElement("#editor-full")){
        CKEDITOR.replace('editor-full', {
            language: 'en-gb',
            extraPlugins: 'forms',
            height: 100,
            toolbarCanCollapse : true,
            toolbarStartupExpanded  : false
        });
    }

    if (cekElement(".style-radio")){
        if($().uniform){
            $('.style-radio').uniform();
        }
    }

    if (cekElement(".style-check")){
        if($().uniform){
            $('.style-check').uniform();
        }
    }

    if (cekElement(".select2-search")){
        if($().select2){
            $('.select2-search').select2({
                theme: "bootstrap-5",
                width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
                allowClear: true
            }).on('change', function () {
                $(this).valid();
            });
        }
    }

    if (cekElement(".FormatKey")){
        $('.FormatKey').keyup(function(event){
            // Allow arrow keys & Period
            if (event.which >= 37 && event.which <= 40) return;
            // if(event.which == 190 || event.which == 110) return;

            // Format Number
            $(this).val(function(index, value)
            {
                number = value.replace(/[^0-9'.']/g, "");
                if (number.match(/\./g))
                {
                    if (number.match(/\./g).length > 1) {
                        return;
                    }
                    else {
                        n = number.search(/\./);
                        numberSplit = number.substr(0, n);
                        firstNumber = numberSplit.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        lastNumber = number.substr(n, 3);
                        return firstNumber + lastNumber;
                    }
                }
                else {
                    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

            });
        });
    }

    if (cekElement(".pickadate")){
        $('.pickadate').pickadate({
            selectMonths: true,
            selectYears: true,
            format: 'dd-mm-yyyy'
        });
    }

    if (cekElement(".mask-time")){
        $('.mask-time').inputmask("hh:mm", {
            placeholder: "00:00",
            insertMode: false,
            showMaskOnHover: false,
            //hourFormat: 24
        });
    }

    if (cekElement("#anytime-time")){
        $('#anytime-time').AnyTime_picker({
            format: '%H:%i'
        });
    }

    // if (cekElement(".datepicker-trans")){
    //     $( ".datepicker-trans" ).datepicker({
    //         // dateFormat: "dd-mm-yy",
    //         format: 'dd-mm-yyyy',
    //         changeMonth: true,
    //         changeYear: true,
    //         yearRange: "-5:+10"
    //     });
    // }

    // if (cekElement(".datepicker-birthdate")){
    //     $( ".datepicker-birthdate" ).datepicker({
    //         dateFormat: "dd-mm-yy",
    //         changeMonth: true,
    //         changeYear: true,
    //         yearRange: "-60:-17"
    //     });
    // }

    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

});

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function closeModal(modalName=null){
    if(modalName){
        $(modalName).modal('hide');
    }
    else{
        $('.modal').modal('hide');
    }
}

function masking(arrParam=null){

    if(Array.isArray(arrParam)){

        if(jQuery.inArray('.keyFontUp', arrParam) !== -1 && cekElement(".keyFontUp")){
            $('.keyFontUp').bind("keyup focusout", function () {
                this.value = this.value.toLocaleUpperCase();
            });
        }

        if(jQuery.inArray('.keyFontLow', arrParam) !== -1 && cekElement(".keyFontLow")){
            $('.keyFontLow').bind("keyup focusout", function () {
                this.value = this.value.toLocaleUpperCase();
            });
        }

        if(jQuery.inArray('.onlyNumber', arrParam) !== -1 && cekElement(".onlyNumber")){
            $('.onlyNumber').keypress(function(event) {
                $(this).val($(this).val().replace(/[^\d].+/, ""));
                if ((event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
            });
        }

        if(jQuery.inArray('#editor-full', arrParam) !== -1 && cekElement("#editor-full")){
            CKEDITOR.replace('editor-full', {
                language: 'en-gb',
                extraPlugins: 'forms',
                height: 100,
                toolbarCanCollapse : true,
                toolbarStartupExpanded  : false
            });
        }

        if(jQuery.inArray('.style-radio', arrParam) !== -1 && cekElement(".style-radio")){
            $('.style-radio').uniform();
        }

        if(jQuery.inArray('.style-check', arrParam) !== -1 && cekElement(".style-check")){
            $('.style-check').uniform();
        }

        if(jQuery.inArray('.select2-search', arrParam) !== -1 && cekElement(".select2-search")){
            $('.select2-search').select2({
                theme: "bootstrap-5",
                width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
                allowClear: true    
            }).on('change', function () {
                $(this).valid();
            });
        }

        if(jQuery.inArray('.FormatKey', arrParam) !== -1 && cekElement(".FormatKey")){
            $('.FormatKey').keyup(function(event){
                // Allow arrow keys & Period
                if (event.which >= 37 && event.which <= 40) return;
                // if(event.which == 190 || event.which == 110) return;

                // Format Number
                $(this).val(function(index, value)
                {
                    number = value.replace(/[^0-9'.']/g, "");
                    if (number.match(/\./g))
                    {
                        if (number.match(/\./g).length > 1) {
                            return;
                        }
                        else {
                            n = number.search(/\./);
                            numberSplit = number.substr(0, n);
                            firstNumber = numberSplit.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            lastNumber = number.substr(n, 3);
                            return firstNumber + lastNumber;
                        }
                    }
                    else {
                        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                });
            });
        }

        if(jQuery.inArray('.pickadate', arrParam) !== -1 && cekElement(".pickadate")){
            $('.pickadate').pickadate({
                selectMonths: true,
                selectYears: true,
                format: 'dd-mm-yyyy'
            });
        }

        if(jQuery.inArray('#anytime-time', arrParam) !== -1 && cekElement("#anytime-time")){
            $('#anytime-time').AnyTime_picker({
                format: '%H:%i'
            });
        }

        if(jQuery.inArray('.mask-time', arrParam) !== -1 && cekElement(".mask-time")){
            $('.mask-time').inputmask("hh:mm", {
                placeholder: "00:00",
                insertMode: false,
                showMaskOnHover: false,
                //hourFormat: 24
            });
        }

        // if(jQuery.inArray('.datepicker-trans', arrParam) !== -1 && cekElement(".datepicker-trans")){
        //     $( ".datepicker-trans" ).datepicker({
        //         dateFormat: "dd-mm-yy",
        //         changeMonth: true,
        //         changeYear: true,
        //         yearRange: "-5:+10"
        //     });
        // }
    }
    else{

        if (cekElement(".keyFontUp")){
            $('.keyFontUp').bind("keyup focusout", function () {
                this.value = this.value.toLocaleUpperCase();
            });
        }

        if (cekElement(".keyFontLow")){
            $('.keyFontLow').bind("keyup focusout", function () {
                this.value = this.value.toLocaleUpperCase();
            });
        }

        if (cekElement(".onlyNumber")){
            $('.onlyNumber').keypress(function(event) {
                $(this).val($(this).val().replace(/[^\d].+/, ""));
                if ((event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
            });
        }

        if (cekElement("#editor-full")){
            CKEDITOR.replace('editor-full', {
                language: 'en-gb',
                extraPlugins: 'forms',
                height: 100,
                toolbarCanCollapse : true,
                toolbarStartupExpanded  : false
            });
        }

        if (cekElement(".style-radio")){
            $('.style-radio').uniform();
        }

        if (cekElement(".style-check")){
            $('.style-check').uniform();
        }

        if (cekElement(".select2-search")){
            $('.select2-search').select2({
                theme: "bootstrap-5",
                width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
                allowClear: true
            }).on('change', function () {
                $(this).valid();
            });
        }

        if (cekElement(".FormatKey")){
            $('.FormatKey').keyup(function(event){
                // Allow arrow keys & Period
                if (event.which >= 37 && event.which <= 40) return;
                // if(event.which == 190 || event.which == 110) return;

                // Format Number
                $(this).val(function(index, value)
                {
                    number = value.replace(/[^0-9'.']/g, "");
                    if (number.match(/\./g))
                    {
                        if (number.match(/\./g).length > 1) {
                            return;
                        }
                        else {
                            n = number.search(/\./);
                            numberSplit = number.substr(0, n);
                            firstNumber = numberSplit.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            lastNumber = number.substr(n, 3);
                            return firstNumber + lastNumber;
                        }
                    }
                    else {
                        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                });
            });
        }

        if (cekElement(".pickadate")){
            $('.pickadate').pickadate({
                selectMonths: true,
                selectYears: true,
                format: 'dd-mm-yyyy'
            });
        }

        if (cekElement("#anytime-time")){
            $('#anytime-time').AnyTime_picker({
                format: '%H:%i'
            });
        }

        if (cekElement(".mask-time")){
            $('.mask-time').inputmask("hh:mm", {
                placeholder: "00:00",
                insertMode: false,
                showMaskOnHover: false,
                //hourFormat: 24
            });
        }

        // if (cekElement(".datepicker-trans")){
        //     $( ".datepicker-trans" ).datepicker({
        //         dateFormat: "dd-mm-yy",
        //         changeMonth: true,
        //         changeYear: true,
        //         yearRange: "-5:+10"
        //     });
        // }
    }
}

function reform(val){
	var a = val.split(",");
	var b = a.join("");

	return b;
}

function FormatDateShow(date) {
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if(day <= 9){day = '0'+day}
    if(month <= 9){month = '0'+month}

    return day + '-' + month + '-' + year;
}

function FormatDateShowWithSlash(date) {
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if(day <= 9){day = '0'+day}
    if(month <= 9){month = '0'+month}

    return day + '/' + month + '/' + year;
}

function FormatDateView(date) {
    date = new Date(date);
    var months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    if(day <= 9){day = '0'+day}

    return day + ' ' + month + ' ' + year;
}

function FormatDateSave(date) {
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if(day <= 9){day = '0'+day}
    if(month <= 9){month = '0'+month}

    return year + '-' + month + '-' + day;
}

function FormatNumber(harga,desimal=0){
	harga=parseFloat(harga);
	harga=harga.toFixed(desimal);

	s = addSeparatorsNF(harga, '.', '.', ',');
	return s;
}

function addSeparatorsNF(nStr, inD, outD, sep){
	nStr += '';
	var dpos = nStr.indexOf(inD);
	var nStrEnd = '';
	if (dpos != -1) {
		nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
		nStr = nStr.substring(0, dpos);
	}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
	}
	return nStr + nStrEnd;
}

function isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function requestGet(url, data = null, div =null){
    if(isEmpty(data)){
        return $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
    else{
        return $.ajax({
            url: url,
            type: "GET",
            data: data,
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
}

function requestDelete(url, data = null, div =null){
    if(isEmpty(data)){
        return $.ajax({
            url: url,
            type: "DELETE",
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
    else{
        return $.ajax({
            url: url,
            type: "DELETE",
            data: data,
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
}

function requestPatch(url, data = null, div =null){
    if(isEmpty(data)){
        return $.ajax({
            url: url,
            type: "PATCH",
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
    else{
        return $.ajax({
            url: url,
            type: "PATCH",
            data: data,
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
}

function cekTypeInput(form,isType){
    var hasil = 0;
    $(form+' :input').each(function() {
        if(typeof($(this).attr('type'))!== undefined){
            if($(this).attr('type')==isType){
                hasil++;
            }
        }
    });

    if(hasil*1>0){
        return true;
    }else{
        return false;
    }
}

function Capitalize(str){
    return str.replace (/\w\S*/g,
        function(txt)
        {  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
}

function requestAjax(method, action, data, div=null){

    isMethod = method.toUpperCase();
    // console.log(div);

    if(cekTypeInput(div,'file'))
    {
        // console.log(1);        
        return $.ajax({
            url: action,
            type: isMethod,
            data: data,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
    else
    {
        // console.log(2);
        return $.ajax({
            url: action,
            type: isMethod,
            data: data,
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                if(notEmpty(div)){
                    myLoad('start',div);
                }
            }
        });
    }
}

function requestPost(url, data, div =null){
    return $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: 'json',
        cache: false,
        // contentType: false,
        // processData: false,
        beforeSend: function(){
            if(notEmpty(div)){
                myLoad('start',div);
            }
        }
    });
}
function requestPostMultipart(url, data, div =null){
    return $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
            if(notEmpty(div)){
                myLoad('start',div);
            }
        }
    });
}
function requestPut(url, data, div =null){
    return $.ajax({
        url: url,
        type: "PUT",
        data: data,
        dataType: 'json',
        cache: false,
        // contentType: false,
        // processData: false,
        beforeSend: function(){
            if(notEmpty(div)){
                myLoad('start',div);
            }
        }
    });
}

function notEmpty(string){
    //debugger
    var v = false;
    if (string != null && string != '' && string != 'undefined') {
        v = true;
    }
    return v;
}

function myLoad(mode, param){
    if(mode == 'start'){
        $(param).block({
            message: '<div class="spinner-border" role="status"></div>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'transparent'
            }
        });
    }
    else{
        $(param).unblock();
    }
}

function myAlert(type, message, url){
    if(url=="" || url=="undefined"){
        var url="";
    }

    if (typeof Swal == 'undefined'){
        console.warn('Warning - sweet_alert.min.js is not loaded.');
        return;
    }

    if (type == "success"){
        Swal.fire({
            // title: "Good job!",
            html: message,
            icon: "success",
            animation : false,
            allowOutsideClick: false,
            showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
            },
            hideClass: {
                popup: '',                     // disable popup fade-out animation
            },
            // showCloseButton: true
        }).then(function() {
            if(url){
                window.location.href = url;
            }
        });
    }
    else if (type == "error" || type == "failed" || type == 'unauthorized'){
        Swal.fire({
            // title: "Oops...",
            html: message,
            animation : false,
            icon: "error",
            showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
            },
            hideClass: {
                popup: '',                     // disable popup fade-out animation
            },
            allowOutsideClick: false,
            // showCloseButton: true
        }).then(function() {
            if(url){
                window.location.href = url;
            }
        });
    }
    else if (type == "info"){
        Swal.fire({
            // title: "For your information",
            html: message,
            icon: "info",
            allowOutsideClick: false,
            // showCloseButton: true
            showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
            },
            hideClass: {
                popup: '',                     // disable popup fade-out animation
            },
        }).then(function() {
            if(url){
                window.location.href = url;
            }
        });
    }
    else if (type == "warning"){
        Swal.fire({
            // title: "For your information",
            html: message,
            icon: "warning",
            allowOutsideClick: false,
            showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
            },
            hideClass: {
                popup: '',                     // disable popup fade-out animation
            },
            // showCloseButton: true
        }).then(function() {
            if(url){
                window.location.href = url;
            }
        });
    }
}

function myConfirmation(message){
    var msg = (notEmpty(message)) ? message : null;
    return Swal.fire({
        title: 'Apakah anda yakin ?',
        html: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'YA',
        cancelButtonText: 'TIDAK',
        confirmButtonColor: '#1CBB8C',
        cancelButtonColor: '#FF3D60',
        showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
        },
        hideClass: {
            popup: '',                     // disable popup fade-out animation
        },
        // showLoaderOnConfirm: true,
        // closeOnConfirm: false,

    });
}

function myNotification(obj){
    // Define directions
    var opts = {
        title: "Over here",
        text: "Check me out. I'm in a different stack.",
        cornerclass: "",
        // animate: {
        //     animate: true,
        //     in_class: 'bounceInDown',
        //     out_class: 'hinge'
        // }
    }
    switch (obj.position) {
        case 'stack_top_left':
            opts.stack = {"dir1": "right", "dir2": "down", "push": "top"};
            opts.addclass = "stack-top-left ";
            break;
        case 'stack_top_right':
            opts.stack = {"dir1": "left", "dir2": "down", "push": "top"};
            opts.addclass = "stack-top-right ";
            break;
        case 'stack_bottom_left':
            opts.stack = {"dir1": "right", "dir2": "up", "push": "top"};
            opts.addclass = "stack-top-left ";
            break;
        case 'stack_bottom_right':
            opts.stack = {"dir1": "left", "dir2": "up", "firstpos1": 20, "firstpos2": 20};
            opts.addclass = "stack-top-right ";
            break;
        case 'stack_custom_left':
            opts.stack = {"dir1": "right", "dir2": "down"};
            opts.addclass = "stack-custom-left ";
            break;
        case 'stack_custom_right':
            opts.stack = {"dir1": "left", "dir2": "up", "push": "top"};
            opts.addclass = "stack-custom-right ";
            break;
        case 'stack_custom_top':
            opts.stack = {"dir1": "right", "dir2": "down", "push": "top", "spacing1": 1};
            opts.width = "100%";
            opts.addclass = "stack-custom-top ";
            opts.cornerclass = "rounded-0";
            break;
        case 'stack_custom_bottom':
            opts.stack = {"dir1": "right", "dir2": "up", "spacing1": 1};
            opts.width = "100%";
            opts.addclass = "stack-custom-bottom ";
            opts.cornerclass = "rounded-0";
            break;
        case 'stack_top_left_rtl':
            opts.stack = {"dir1": "left", "dir2": "down", "push": "top"};
            opts.addclass = "stack-top-left-rtl ";
            break;
        case 'stack_bottom_right_rtl':
            opts.stack =  {"dir1": "right", "dir2": "up", "firstpos1": 20, "firstpos2": 20};
            opts.addclass = "stack-top-left-rtl ";
            break;
        case 'stack_custom_left_rtl':
            opts.stack = {"dir1": "left", "dir2": "down"};
            opts.addclass = "stack-custom-left-rtl ";
            break;
        case 'stack_custom_right_rtl':
            opts.stack = {"dir1": "right", "dir2": "up", "push": "top"};
            opts.addclass = "stack-custom-right-rtl ";
            break;
        default:
            opts.stack = {"dir1": "left", "dir2": "down", "push": "top"};
            opts.addclass = "stack-top-right ";
            break;
    }
    switch(obj.type){
        case 'error' || 'failed' || 'danger':
            opts.title = (notEmpty(obj.title)) ? obj.title : "Oh No";
            opts.text = obj.message;
            opts.type = "error";
            opts.addclass = opts.addclass + " bg-danger border-danger";
            break;
        case 'info' || 'default':
            opts.title = (notEmpty(obj.title)) ? obj.title : "Information";
            opts.text = obj.message;
            opts.type = "info";
            opts.addclass = opts.addclass + " bg-info border-info";
            break;
        case 'warning':
            opts.title = (notEmpty(obj.title)) ? obj.title : "Information";
            opts.text = obj.message;
            opts.type = "info";
            opts.addclass = opts.addclass + " bg-warning border-warning";
            break;
        case 'success':
            opts.title = (notEmpty(obj.title)) ? obj.title : "Good News Everyone";
            opts.text = obj.message;
            opts.type = "success";
            opts.addclass = opts.addclass + " bg-success border-success";
            break;
        default:
            opts.title = (notEmpty(obj.title)) ? obj.title : "Information";
            opts.text = obj.message;
            opts.type = "info";
            opts.addclass = opts.addclass + " bg-info border-info";
            break;
    }
    new PNotify(opts);
}

function errorValidation(errors){
    var title = 'Plase check your field';
    var message = '<ul>';
    response  = JSON.parse(errors.responseText);
    jQuery.each(response .errors, function(key, value){
        message = message + '<li>' + value + '</li>';
    });
    message = message + '</ul>';
    myNotification({
        type: 'warning',
        title: title,
        message: message,
        position: 'stack_custom_top',
    });
}

function errorMessage(error){
    if(document.readyState == 'complete' ){
        if(notEmpty(error.status))
        {
            if(error.status == 422)
            {
                //validation
                errorValidation(error);
            }
            else
            {
                if (error.status != 0) {
                    var msg = "SOMETHING WENT WRONG<br /> PLEASE TRY AGAIN...";
                    myAlert('failed', msg);
                    console.error(error);
                }
            }
        }
        else
        {
            if (error.status != 0) {
                var msg = "SOMETHING WENT WRONG<br /> PLEASE TRY AGAIN...";
                myAlert('failed', msg);
                console.error(error);
            }
        }
    }
}

function checkResponse(response){
    if(response.respon == 'success'){
        var url= '';
        if(!response.url=="" || !response.url=="undefined")
        {
            url = response.url;
        }

        myAlert(response.respon, response.message,url);
    }
    else if(response.respon == 'failed' || response.respon == 'error'){
        myAlert(response.respon,response.message);
    }

    return response;
}

//serialize data function
function objectifyForm(formArray){
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function reformJson(dataArray){
    if (typeof dataArray !== "undefined") {
        return JSON.parse(dataArray.replace(/&quot;/g,'"'));
    }
    else{
        return [];
    }
}

function myResetForm(form){
    var element = $(form);
    element.trigger('reset');
    $('.form-group').removeClass("has-error");
    $('input[type=text]').prop('readonly', false).change();
    // $('input[type=checkbox]').prop('checked', true).change();
    // $(' :checkbox').each(function (i, item) {
    //     this.checked = item.defaultChecked;
    // });
    $('.error').remove();
    $(".help-block").remove();
}

function disableButton(param){
    var fewSeconds = 15;
    $(param).attr("disabled", "disabled");
    setTimeout(function() {
        $(param).removeAttr("disabled");
    }, fewSeconds*1000);
}

function setNavigation(index = 1){
    var path = window.location.href; //sets the variable "url" to the pathname of the current window
    let el = $('.nav li a').filter(function () {
        return path.split('/').reverse().find((a) => {
            if(path === `${this.getAttribute('href')}`){
                return this.getAttribute('href');
            }else{
                // console.log(path.split(a)[0]);
                if(path.split(a)[0] === `${this.getAttribute('href')}/`){
                    return this.getAttribute('href');
                }
            }
            // return this.getAttribute('href').find((b) => b === a);
        });
    });
    if($(el[el.length-1])){
        $(el[el.length-1]).addClass('active').parentsUntil($('.nav>li>a[href="' + path + '"]')).addClass('nav-item-open').closest('ul.nav-group-sub').prop('style', 'display:block;')
    }
}

function myModal(modal,form){
    if (notEmpty(modal)) {
        // myReset(form);
        $(modal).modal({
            keyboard: false,
            backdrop: 'static'
        });
    } else {
        errorMessage('modal is empty');
    }
}

function cekElement(param){
    if($(param).length > 0){
        return true;
    }
    return false
}

function mouseover(target){
    if(target.bgColor!="#CCFFBB"){
        if (target.bgColor=='#ede8e7'){
            target.bgColor='#ede8e7';
        }
        else{
            target.bgColor='#ede8e7';
        }
    }
}

function mouseout(target){
    if(target.bgColor!="#CCFFBB"){
        if (target.bgColor=='#ccccff'){
            target.bgColor='#ccccff';
        }
        else{
            target.bgColor='#FFFFFF';
        }
    }
}

function mouseclick(target){
    if(target.bgColor!="#CCFFBB"){
        target.bgColor="#CCFFBB";
    }else{
        target.bgColor="#FFFFFF";
    }
}

function TerbilangNumber(nilai){
    var bilangan=nilai.toString();
    var kalimat ="";
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
    var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
    var panjang_bilangan = bilangan.length;

    /* pengujian panjang bilangan */
    if(panjang_bilangan > 15){
        kalimat = "Diluar Batas";
    }
    else{
        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for(i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i),1);
        }

        var i = 1;
        var j = 0;

        /* mulai proses iterasi terhadap array angka */
        while(i <= panjang_bilangan){
            subkalimat = "";
            kata1 = "";
            kata2 = "";
            kata3 = "";

            /* untuk Ratusan */
            if(angka[i+2] != "0"){
                if(angka[i+2] == "1"){
                    kata1 = "Seratus";
                }else{
                    kata1 = kata[angka[i+2]] + " Ratus";
                }
            }

            /* untuk Puluhan atau Belasan */
            if(angka[i+1] != "0"){
                if(angka[i+1] == "1"){
                    if(angka[i] == "0"){
                        kata2 = "Sepuluh";
                    }else if(angka[i] == "1"){
                        kata2 = "Sebelas";
                    }else{
                        kata2 = kata[angka[i]] + " Belas";
                    }
                }else{
                    kata2 = kata[angka[i+1]] + " Puluh";
                }
            }

            /* untuk Satuan */
            if (angka[i] != "0"){
                if (angka[i+1] != "1"){
                    kata3 = kata[angka[i]];
                }
            }

            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")){
                subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
            }

            /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
            kalimat = subkalimat + kalimat;
            i = i + 3;
            j = j + 1;
        }

        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")){
            kalimat = kalimat.replace("Satu Ribu","Seribu");
        }
    }

    return kalimat.trim().toLowerCase();
}

function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
        masking();
	}
	return "";
}

function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
        }
        masking();
	}
}


 // Quick and simple export target #table_id into a csv
 function download_table_as_csv(table_id, id_event, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('#' + table_id + ' tr');

    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = String(data).replaceAll(",","");
            data = String(data).replaceAll(".","");
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it

    var filename = 'export_' + String(id_event).replaceAll(" ","").replaceAll("/","") + '_' + dayjs().format('YYYYMMDD_HHmm') + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Tabel Berhasil di Unduh");
}

function selectElementContents(elId) {
    let el =  document.getElementById(elId);
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
            document.execCommand('copy');
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
            document.execCommand('copy');
        }
        sel.removeAllRanges();
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        document.execCommand('copy');
    }
    toast("Tabel Berhasil di Copy");
}

function toast(text){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: text
      })
};

function lineToList(text){
    let str = String(text);
    let arr = str.split(/\r\n|\n|\r/);
    let itemList = arr.map(item => `<li>${item}</li>` ).join("");
    return `
        <ol style="padding-left:15px;">
            ${itemList}
        </ol>
    `;
}

base.slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  };


const Req = {
    api : function(endPoint,body){
      return new Promise((resolve, reject) => {
          var settings = {
            "url": endPoint,
            "method": "POST",
            "timeout": 0,
            "data": body,
            "headers": {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
          };
          
          jQuery.ajax(settings).done(function (response) {
            window.serverTime = response.timestamp;
            resolve(response);
          }).fail(function (jqXHR, textStatus, errorThrown) {
            resolve({ status: false, message: "Terjadi masalah pada koneksi data - " + textStatus});
          });
      });
    },
    apiGet : function(endPoint,body){
        return new Promise((resolve, reject) => {
            var settings = {
              "url": endPoint,
              "method": "GET",
              "timeout": 0,
              "data": body,
              "headers": {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            };
            
            jQuery.ajax(settings).done(function (response) {
              window.serverTime = response.timestamp;
              resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown) {
              resolve({ status: false, message: "Terjadi masalah pada koneksi data - " + textStatus});
            });
        });
      },
} 

const fn = {
    loadingSwal : {},
    bulan : ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
    tahun : ["2018","2019","2020","2021","2022","2023","2024","2025","2026"],
    loading : function(state, text){
        if(state == "show"){
            this.loadingSwal = Swal.mixin({
                title: '',
                html: text || "",
                allowOutsideClick : false,
                allowEscapeKey : false,
                didOpen: () => {
                    Swal.showLoading()   
                },
                });
            this.loadingSwal.fire({});    
        }
        if(state == "close"){
            try {
                this.loadingSwal.close();
            } catch (error) {}
        }       
    },
   
    errorAlert : function(text){
        let alertBox = Swal.mixin({
            title: '',
            html: text || "",
            allowOutsideClick : false,
            allowEscapeKey : false,
            icon: 'error',   
        });
        alertBox.fire({});
    },
    successAlert : function(text){
        let alertBox = Swal.mixin({
            title: '',
            html: text || "",
            allowOutsideClick : false,
            allowEscapeKey : false,
            icon: 'success',   
        });
        return alertBox.fire({});
    },

    modal : function(text){
        let alertBox = Swal.mixin({
            title: '',
            html: text || "",
            allowOutsideClick : false,
            allowEscapeKey : false,
            width: '750px',   
        });
        return alertBox.fire({});
    },

    
    confirm: function(text){
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: '',
                //text: text,
                html: text,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal',
                allowOutsideClick : false,
                allowEscapeKey : false,
              }).then((result) => {
                if (result.isConfirmed) {
                    resolve(true);
                }else{
                    resolve(false);
                }
              })
        });
        
    },
    toast : function(text){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
              },
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: text
          })
    },
    fillFromData : function(form, data){

        $.each(data, (key, value) => {
            var ctrl = $("[name=" + key + "]", form);
            switch (ctrl.prop("type")) {
                case "radio":
                    if (
                        ctrl.parent().hasClass("icheck-primary") ||
                        ctrl.parent().hasClass("icheck-danger") ||
                        ctrl.parent().hasClass("icheck-success")
                    ) {
                        // raido kutularında aynı isimden birden fazla denetçi olduğu için bunları döngüyle almak lazım
                        // multiple radio boxes has same name and has different id. for this we must look to each html element
                        $.each(ctrl, function(ctrlKey, radioElem) {
                            radioElem = $(radioElem);
                            console.log(radioElem);
                            console.log(radioElem.attr("value"));
    
                            if (radioElem.attr("value") == value) {
                                radioElem.iCheck("check");
                            } else {
                                radioElem.iCheck("uncheck");
                            }
                        });
                    } else {
                        $.each(ctrl, function(ctrlKey, radioElem) {
                            radioElem = $(radioElem);
                            console.log(radioElem);
                            console.log(radioElem.attr("value"));
    
                            if (radioElem.attr("value") == value) {
                                radioElem.attr("checked", value);
                            } else {
                                radioElem.attr("checked", value);
                            }
                        });
                    }
                    break;
    
                case "checkbox":
                    if (
                        ctrl.parent().hasClass("icheck-primary") ||
                        ctrl.parent().hasClass("icheck-danger") ||
                        ctrl.parent().hasClass("icheck-success")
                    ) {
                        if (ctrl.attr("value") == value) {
                            ctrl.iCheck("check");
                        } else {
                            ctrl.iCheck("uncheck");
                        }
                    } else {
                        ctrl.removeAttr("checked");
                        ctrl.each(function() {
                            if (value === null) value = "";
                            if ($(this).attr("value") == value) {
                                $(this).attr("checked", value);
                            }
                        });
                    }
                    break;
                default:
                    ctrl.val(value);
            }
        });
    },
    convertFormToData : function(formElement){
        let form = new FormData($(formElement)[0]);
        //console.log(form);
        return Object.fromEntries(form.entries());
    },
    replaceAll : function (str, match, replacement){
        return str.split(match).join(replacement);
    },
    groupByData : function(data,keyItem){
        return _.chain(data)
        .groupBy(keyItem)
        .map((value, key) => ({ [keyItem] : key, items: value }))
        .value()
    },

    numberInputListener : function(selector){
        var inputEl = document.querySelector(selector);
        inputEl.addEventListener('input', function()
        {
            let val = numeral(inputEl.value).value();
            inputEl.value = numeral(val).format('0,0'); 
        });
    },

    formatNumber : function(number){
        return numeral(number).format('0,0')
    },

    convertToLink : function(text){
        return String(text).replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a target="_blank" href="$1">$1</a> ');
    },
}

function predikat_nilai(kinerja, perilaku, statusKPA = "non-kpa") {
 

   let  predikat = {
        kriteria_predikat: '',
        persentase_tukin: 0
    };

    let searchData = golbal_kuadran_penilaiaan.find(item => item.id_nilai_kinerja == kinerja && item.id_nilai_perilaku == perilaku);

    if(searchData != null){
        predikat = {
            kriteria_predikat: searchData.nama,
            persentase_tukin: statusKPA == "non-kpa" ?  searchData.tunkin_non_kpa : searchData.tunkin_kpa, 
        };
    }
    
    return predikat;

    if(kinerja == 1 && perilaku == 1){
        predikat = {
            kriteria_predikat: 'SANGAT KURANG', 
            persentase_tukin: 0 
        };
    }

    if(kinerja == 1 && perilaku == 2){
        predikat = {
            kriteria_predikat: 'BUTUH PERBAIKAN',
            persentase_tukin: 25
        };
    }

    if(kinerja == 1 && perilaku == 3){
        predikat = {
            kriteria_predikat: 'BUTUH PERBAIKAN',
            persentase_tukin: 25
        };
    }

    if(kinerja == 2 && perilaku == 1){
        predikat = {
            kriteria_predikat: 'KURANG',
            persentase_tukin: 35
        };
    }

    if(kinerja == 2 && perilaku == 2){
        predikat = {
            kriteria_predikat: 'BAIK',
            persentase_tukin: 50
        };
    }

    if(kinerja == 2 && perilaku == 3){
        predikat = {
            kriteria_predikat: 'BAIK',
            persentase_tukin: 50
        };
    }

    if(kinerja == 3 && perilaku == 1){
        predikat = {
            kriteria_predikat: 'KURANG',
            persentase_tukin: 35
        };
    }

    if(kinerja == 3 && perilaku == 2){
        predikat = {
            kriteria_predikat: 'BAIK',
            persentase_tukin: 50
        };
    }

    if(kinerja == 3 && perilaku == 3){
        predikat = {
            kriteria_predikat: 'SANGAT BAIK',
            persentase_tukin: 50
        };
    }


    return predikat;

    switch (kinerja | perilaku)
    {
        case 1 | 1: // kinerja dibawah ekspetasi dan prilaku dibawah ekspetasi
            predikat = {
                kriteria_predikat: 'SANGAT KURANG', 
                persentase_tukin: 0 
            };
            break;

        case 1 | 2: // kinerja dibawah ekspetasi dan prilaku sesuai ekspetasi
            predikat = {
                kriteria_predikat: 'BUTUH PERBAIKAN',
                persentase_tukin: 25
            };
            break;

        case 1 | 3: // kinerja dibawah ekspetasi dan prilaku diatas ekspetasi
            predikat = {
                kriteria_predikat: 'BUTUH PERBAIKAN',
                persentase_tukin: 25
            };
            break;

        case 2 | 1: // kinerja sesuai ekspetasi dan prilaku dibawah ekspetasi
            predikat = {
                kriteria_predikat: 'KURANG',
                persentase_tukin: 35
            };
            break;

        case 2 | 2: // kinerja sesuai ekspetasi dan prilaku sesuai ekspetasi
            predikat = {
                kriteria_predikat: 'BAIK',
                persentase_tukin: 50
            };
            break;

        case 2 | 3: // kinerja sesuai ekspetasi dan prilaku diatas ekspetasi
            predikat = {
                kriteria_predikat: 'BAIK',
                persentase_tukin: 50
            };
            break;

        case 3 | 1: // kinerja diatas ekspetasi dan prilaku dibawah ekspetasi
            predikat = {
                kriteria_predikat: 'KURANG',
                persentase_tukin: 35
            };
            break;

        case 3 | 2: // kinerja diatas ekspetasi dan prilaku sesuai ekspetasi
            predikat = {
                kriteria_predikat: 'BAIK',
                persentase_tukin: 50
            };
            break;

        case 3 | 3: // kinerja diatas ekspetasi dan prilaku diatas ekspetasi
            predikat = {
                kriteria_predikat: 'SANGAT BAIK',
                persentase_tukin: 50
            };
            break;

        default:
            predikat = '';
            break;
    }

    console.log(predikat);
    return predikat;

}

async function getDiagramCasecade(skp){
    let elModal = `
        <div class="modal fade" id="diagramCasecadeModal" tabindex="-1" aria-labelledby="diagramCasecadeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="diagramCasecadeModalLabel">Diagram Casecade SKP</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    
                </div>
            </div>
        </div>
    `;

    let url = route("skp.getCasecade",{ skp : skp});
    let reqData =  await Req.api(url,{});
    


    $("body").append(elModal);
    setTimeout(() => {
        var diagramCasecadeModal = new bootstrap.Modal(document.getElementById('diagramCasecadeModal'));
        document.getElementById('diagramCasecadeModal').addEventListener('hidden.bs.modal', function () {
            $("#diagramCasecadeModal").remove();
        });
        diagramCasecadeModal.show();
    }, 100);

}

function uWord(text){
    return String(text)
    .split(" ") // Split the string into an array of words
    .map(word => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)) // Convert each word to lowercase
    .join(" ");
};

function createDataTable(dataSource, opt = {}) {
        $(opt.elTableWrapper).html("");
        if(dataSource.length <= 0){
            let el = `
                <div class="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
                    <div><img src="" style="height:200px;" /></div>
                    <div class="mt-4"><p class="text-muted">Tidak ada data yang dapat ditampilkan</p></div>
                </div>
            `;
            $(opt.elTableWrapper).html(el);

            return;
        }

        let _columns = Object.keys(dataSource[0]).map(function(key) {
                return { title: uWord(key.replaceAll("_", " ")), data: key };
            });

        _columns = [{title: 'No', orderable: false, searchable: false, width: "10px" , data : null}].concat(_columns);    

        $(opt.elTableWrapper).html("");

        let customClass = opt.customClass || 'display nowrap no-border table table-striped table-centered align-middle table-nowrap mb-0';
        
        var table = $('<table>').addClass(`${customClass}`).css("width", "100%").appendTo(opt.elTableWrapper);

        return table.DataTable({
            data: dataSource,
            responsive: true,
            scrollX: true,
            columns: _columns,
            layout: {
                topStart: {
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Export Excel',
                            customize: function (xlsx) {
                               
                                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                $('row c[r^="B"]', sheet).each(function () {
                                    //$(this).text("aaaaaa");
                                });
                            }
                        }
                    ]
                }
            },
            fnRowCallback : function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td:eq(0)', nRow).html(iDisplayIndexFull +1);
            },
            ...opt,
          
            pagingType: 'simple_numbers',
            language: {
                paginate: {
                    first: " << ",
                    last: " >> ",
                    next: " > ",
                    previous: " < "
                },
                search : "Pencarian : ",
                zeroRecords :"Tidak ditemukan data dengan kata kunci yang cocok",
                info: "Menampilkan _START_ s.d _END_ dari _TOTAL_ data"
            }
        });
}

function createDataTableExcel(dataSource, opt = {}) {
    $(opt.elTableWrapper).html("");
    if(dataSource.length <= 0){
        let el = `
            <div class="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
                <div><img src="" style="height:200px;" /></div>
                <div class="mt-4"><p class="text-muted">Tidak ada data yang dapat ditampilkan</p></div>
            </div>
        `;
        $(opt.elTableWrapper).html(el);

        return;
    }

    let _columns = Object.keys(dataSource[0]).map(function(key) {
            return { title: uWord(key.replaceAll("_", " ")), data: key };
        });

    //_columns = [{title: 'No', orderable: false, searchable: false, width: "10px" , data : null}].concat(_columns);    

    $(opt.elTableWrapper).html("");

    let customClass = opt.customClass || 'display nowrap no-border table table-striped table-centered align-middle table-nowrap mb-0';
    
    var table = $('<table>').addClass(`${customClass}`).css("width", "100%").appendTo(opt.elTableWrapper);

    return table.DataTable({
        data: dataSource,
        responsive: true,
        scrollX: true,
        columns: _columns,
        layout: {
            topStart: {
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Export Excel',
                        customize: function (xlsx) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];
                            
                            $('row c t', sheet).each(function () {
                                var cellText = $(this).html();
                                cellText = cellText.replace(/&lt;br&gt;/g, '\n').replace(/<br\s*\/?>/g, '\n');
                                cellText = cellText.replaceAll('<br>', '\n').replaceAll('<br/>', '\n');
                                cellText = cellText.replaceAll('| ', '\n');
                                cellText = cellText.replaceAll('|', '\n');
                                $(this).html(cellText);
                            });
                            
                            $('row c[r^="B"]', sheet).attr('t', 'inlineStr')
                                .find('is t').each(function () {
                                var cellValue = $(this).text();
                                if (/^\d{15,}/.test(cellValue)) {
                                    $(this).text(cellValue); // Keep it as-is without converting
                                }
                            });

                            $('row c[r^="C"]', sheet).attr('t', 'inlineStr')
                                .find('is t').each(function () {
                                var cellValue = $(this).text();
                                if (/^\d{15,}/.test(cellValue)) {
                                    $(this).text(cellValue); // Keep it as-is without converting
                                }
                            });

                            $('row c[r^="D"]', sheet).attr('t', 'inlineStr')
                                .find('is t').each(function () {
                                var cellValue = $(this).text();
                                if (/^\d{15,}/.test(cellValue)) {
                                    $(this).text(cellValue); // Keep it as-is without converting
                                }
                            });

                            $('row c[r^="E"]', sheet).attr('t', 'inlineStr')
                                .find('is t').each(function () {
                                var cellValue = $(this).text();
                                if (/^\d{15,}/.test(cellValue)) {
                                    $(this).text(cellValue); // Keep it as-is without converting
                                }
                            });
                            // Apply text wrapping to all cells
                            //$('row c', sheet).attr('s', '51');
                            
                        },
                        
                    }
                ]
            }
        },
        ...opt,
      
        pagingType: 'simple_numbers',
        language: {
            paginate: {
                first: " << ",
                last: " >> ",
                next: " > ",
                previous: " < "
            },
            search : "Pencarian : ",
            zeroRecords :"Tidak ditemukan data dengan kata kunci yang cocok",
            info: "Menampilkan _START_ s.d _END_ dari _TOTAL_ data"
        }
    });
}