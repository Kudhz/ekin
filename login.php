<!DOCTYPE html>
<html data-bs-theme="light">
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>BOT E-KINERJA JAMET</title>
    <link rel="shortcut icon" href="https://e-kinerja.kemenhub.go.id/assets/images/favicon.ico" />
    <style>
        .message {
            margin-top: 10px;
            padding: 10px;
            display: none;
        }
        .success {
            background-color: #4CAF50;
            color: white;
        }
        .error {
            background-color: #f44336;
            color: white;
        }
    </style>
    <!-- <link href="https://e-kinerja.kemenhub.go.id/assets/css/bootstrap.min.css?app=Laravel" rel="stylesheet" type="text/css" > -->
    <link href="https://e-kinerja.kemenhub.go.id/assets/css/icons.min.css?app=Laravel" rel="stylesheet" type="text/css" >
    <link href="https://e-kinerja.kemenhub.go.id/assets/css/app.min.css?app=Laravel" rel="stylesheet" type="text/css" >
    <link href="https://e-kinerja.kemenhub.go.id/assets/css/app_css.css?app=Laravel" rel="stylesheet" type="text/css" >
    <link href="https://e-kinerja.kemenhub.go.id/assets/libs/sweetalert2/sweetalert2.min.css?app=Laravel" rel="stylesheet" type="text/css" >

    <script src="https://www.google.com/recaptcha/api.js?hl=id" async defer></script>
    <style>
        .auth-wrapper{
            position:relative;
        }
        .auth-wrapper:before {
            width: 238px;
            height: 233px;
            content: " ";
            position: absolute;
            top: -55px;
            left: -40px;
            background-image: url("https://e-kinerja.kemenhub.go.id/assets/images/1.svg");
        }

        .auth-wrapper:after {
            width: 180px;
            height: 180px;
            content: " ";
            position: absolute;
            z-index: 0;
            bottom: -30px;
            right: -56px;
            background-image: url("https://e-kinerja.kemenhub.go.id/assets/images/2.svg");
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <?php
        $ch = curl_init('https://e-kinerja.kemenhub.go.id/auth/login');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_BODY, true);
        $response = curl_exec($ch);
        curl_close($ch);

        $headers = explode("\n", $response);
        $cookies = array();
        foreach ($headers as $header) {
            if (strpos($header, 'Set-Cookie:') !== false) {
                $cookie = trim(substr($header, strpos($header, ':') + 1));
                $cookie_parts = explode(';', $cookie);
                $cookie_name_value = explode('=', $cookie_parts[0]);
                $cookies[$cookie_name_value[0]] = $cookie_name_value[1];
            }
        }

        $dom = new DOMDocument();
        @$dom->loadHTML(substr($response, strpos($response, '<html>')));
        $metas = $dom->getElementsByTagName('meta');
        $captchaSrc = '';
        $divs = $dom->getElementsByTagName('div');
        
        foreach ($divs as $div) {
        if ($div->getAttribute('class') === 'div-img-captcha') {
            $imgs = $div->getElementsByTagName('img');
        foreach ($imgs as $img) {
            $captchaSrc = $img->getAttribute('src');
        }
    }
}

        $csrf_token = '';
        foreach ($metas as $meta) {
            if ($meta->getAttribute('name') == 'csrf-token') {
                $csrf_token = $meta->getAttribute('content');
                break;
            }
        }

// echo "XSRF-TOKEN: " . $cookies['XSRF-TOKEN'] . "\n";
// echo "laravel_session: " . $cookies['laravel_session'] . "\n";
// echo "TS0168dff9: " . $cookies['TS0168dff9'] . "\n";
// echo "CSRF Token: $csrf_token\n";

$xsrfToken = $cookies['XSRF-TOKEN'];
$laravelSession = $cookies['laravel_session'];
$ts0168dff9 = $cookies['TS0168dff9'];
$ga = "_ga_B2LYNLLX1B=GS1.1.1737566083.9.1.1737566107.0.0.0; _ga=GA1.1.72744355.1734843507; _clck=2wm2yo%7C2%7Cfss%7C0%7C1817;";
$cookieString = "$ga;XSRF-TOKEN=$xsrfToken;laravel_session=$laravelSession;TS0168dff9=$ts0168dff9";
echo "CAPTCHA Source: $captchaSrc\n";
echo $response;
// echo $cookieString;
?>

<div class="authentication-bg min-vh-100">
        <div class="bg-overlay bg-light"></div>
        <div class="container">
            <div class="d-flex flex-column min-vh-100 px-3 pt-4">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-lg-5 col-xl-5 auth-wrapper">
                        
                           <div class="card" style="z-index:10;">
        <div class="card-body p-4"> 
            <div class="text-center mt-2 mb-2">
                <img src="https://e-kinerja.kemenhub.go.id/assets/images/logo-dark.png" alt="" height="60">
            </div>

            
                            <div class="alert alert-info alert-border-left alert-dismissible fade show mb-0" role="alert">
                    <i class="mdi mdi-alert-circle-outline align-middle me-3"></i><strong>Info</strong> - Untuk mengakses aplikasi ini dapat menggunakan user akses di aplikasi SIK        
                </div>   
                        
            <div class="p-2 mt-2">
            <form id="form" class="login-form" action="loginAPI.php" method="post" onsubmit="return handleSubmit(event)">
                    <input type="hidden" id="_token" name="_token"  value="<?php echo $csrf_token; ?>">  <input type="hidden" name="act" value="login"> 
                    <input type="hidden" id="cookie1" name="cookie1"  value="<?php echo $cookieString; ?>">                  

                    <div class="mb-3">
                        <label class="form-label" for="username">Username</label>
                        <div class="position-relative input-custom-icon">
                            <input id="v_username" type="text" class="form-control" name="v_username" placeholder="Masukan username" required autofocus>
                            <span class="bx bx-user"></span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="float-end">
                            <a href="https://sik.dephub.go.id/login/start/lupa_password" class="text-muted text-decoration-underline">Lupa Password?</a>
                        </div>
                        <label class="form-label" for="password-input">Password</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <span class="bx bx-lock-alt"></span>
                            <input id="v_password" type="password" class="form-control" name="v_password" required placeholder="Masukan password">
                            <button type="button" class="btn btn-link btn-eye position-absolute h-100 end-0 top-0" data-action="0">
                                <i class="mdi mdi-eye-outline font-size-18 text-muted"></i>
                            </button>
                        </div>

                                            </div>

                    <div class="mb-3">
                        
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12 d-sm-block pt-0 pb-0 mt-0 mb-0">
                                <div class="form-group text-right">
                                    <div class="input-group div-img-captcha mt-2">
                                        <span>
                                            <img src="https://e-kinerja.kemenhub.go.id/captcha/flat?3WODiJqE" >
                                        </span>
                                        <a href="javascript:void(0);" class="refreshCaptcha text-danger ml-2 mt-1">
                                            <i class="fa fa-refresh"></i> Reload Captcha</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12 pt-2 pb-0 mt-0 mb-0">
                                <span class="form-text text-left">
                                    <input type="text" class="form-control  auth-input-rounded v_captcha" name="v_captcha" id="v_captcha" placeholder="Captcha" required autocomplete="off">
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-3 mb-2">
                        <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">MASUK</button>
                        <a class="btn btn-primary w-100 waves-effect waves-light" href="https://e-kinerja.kemenhub.go.id/logout"><i class="mdi mdi-logout text-muted font-size-16 align-middle me-2"></i> <span class="align-middle">Logout</span></a>
                    </div>

                </form>
            </div>
        </div>
    </div>

                       <div class="text-center p-1">
                            <p>© <script>document.write(new Date().getFullYear())</script> Bot Auto Input E-kinerja Jamet</p>
                       </div>

                    </div><!-- end col -->
                </div><!-- end row -->

              

            </div>
        </div><!-- end container -->
    </div>

    <script>
        async function handleSubmit(event) {
            event.preventDefault(); // Mencegah submit default

            const formData = new FormData(document.getElementById('form'));
            const plainFormData = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('loginAPI.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(plainFormData),
                });

                if (response.ok) {
            // Status code 200-299 (sukses)
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('form').reset();
            } else {
                // Status code selain 200-299 (gagal)
                document.getElementById('success-message').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = `Gagal dengan status code: ${response.status}`;
            }
            } catch (error) {
                document.getElementById('success-message').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = `Terjadi kesalahan: ${error.message}`;
            }

    return false;
        }
    </script>
</body>
</html>