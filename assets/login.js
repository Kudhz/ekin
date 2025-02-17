var general = {};

$(document).ready(function() {

    general.form    = 'form-action';
    general.module  = 'auth';
    general.url     = route('auth.action');

    if (cekElement('.v_username')){
        $('input[name="v_username"]').focus();
    }

    $('body').on('keydown', 'input, select', function(e) {
        
        if (e.key === "Tab") {
            // alert('masuk')
            var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
            focusable = form.find('input,button').filter(':visible');
            next = focusable.eq(focusable.index(this)+1);
            if (next.length) {
                next.focus();
            } else {
                form.submit();
            }
            return false;
        }
    });

    if (cekElement('#'+general.form)){
        let settingValidation = {
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
                if (element.parents().hasClass('input-custom-icon')) {
                    error.appendTo(element.parents('.input-custom-icon').parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
        };

        settingValidation.submitHandler = function(form){
            let data = $(form).serialize();;
            let promise = requestAjax('post',general.url, data, '#'+general.form);
            promise.then(function(response) {
                myLoad('end','#'+general.form);
                if (response.respon == 'success') {
                    myAlert(response.respon, response.message,response.url);
                }
                else {
                    myAlert(response.respon, response.message);
                    // if (response.flag != 'captcha') {
                        $.ajax({
                            type:'GET',
                            url:route('auth.refreshCaptcha'),
                            success:function(data){
                            $('.div-img-captcha span').html(data.captcha);
                            }
                        });
                        $('input[name=v_captcha]').val(null)
                    // }
                }
            }).fail((response) => {
                myLoad('end','#'+general.form);
                errorMessage(response);
                $.ajax({
                    type:'GET',
                    url:route('auth.refreshCaptcha'),
                    success:function(data){
                    $('.div-img-captcha span').html(data.captcha);
                    }
                });
                $('input[name=v_captcha]').val(null)
            });

            return false
        };

        $('#'+general.form).validate(settingValidation);
    }

    if (cekElement('.btn-eye')){
        $('.btn-eye').click(function(){
            var pass = document.getElementById('v_password');
            if(pass.type === 'password'){
                //see password
                pass.type = 'text';
                this.innerHTML = '<i class="mdi mdi-eye-off-outline"></i>';
            }else{
                //close password
                pass.type = 'password';
                this.innerHTML = '<i class="mdi mdi-eye-outline"></i>';
            }
        });
    }

    if (cekElement('.refreshCaptcha')){

        $('.refreshCaptcha').click(function(){
            $.ajax({
                type:'GET',
                url:route('auth.refreshCaptcha'),
                success:function(data){
                   $('.div-img-captcha span').html(data.captcha);
                }
             });
        });
    }

});
