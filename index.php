<!DOCTYPE html>
<html data-bs-theme="dark">
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
  <div class="authentication-bg min-vh-100">
        <div class="bg-overlay bg-dark"></div>
        <div class="container">
            <div class="d-flex flex-column min-vh-100 px-3 pt-4">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-lg-5 col-xl-5 auth-wrapper">
                        <div class="card" style="z-index:10;">
        <div class="card-body p-4"> 
            <div class="text-center mt-2 mb-2">
                <img src="https://e-kinerja.kemenhub.go.id/assets/images/logo-dark.png" alt="" height="60">
            </div>

            
                            <div class="alert alert-success message" id="success-message">Data submitted successfully!</div>
                            <div class="malert alert-danger message" id="error-message"></div>
                        
            <div class="p-2 mt-2">
                <form id="form" class="login-form" action="process.php" method="post" onsubmit="return handleSubmit(event)">

                    <div class="mb-3">
                        <label class="form-label" for="username">ID Tombol</label>
                        <div class="position-relative input-custom-icon">
                            <input id="id" type="text" class="form-control" name="id" placeholder="1234..." required autofocus>
                            <!-- <span class="bx bx-user"></span> -->
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="username">Cookies</label>
                        <div class="position-relative input-custom-icon">
                            <input id="cookie" type="text" class="form-control" name="cookie" placeholder="masukan cookie" required autofocus>
                            <!-- <span class="bx bx-user"></span> -->
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password-input">CSRF</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="csrf" type="text" class="form-control" name="csrf" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 1</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value1" type="text" class="form-control" name="value1" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 2</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value2" type="text" class="form-control" name="value2" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 3</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value3" type="text" class="form-control" name="value3" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 4</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value4" type="text" class="form-control" name="value4" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 5</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value5" type="text" class="form-control" name="value5" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="password-input">Renaksi Value 6</label>
                        <div class="position-relative auth-pass-inputgroup input-custom-icon">
                            <!-- <span class="bx bx-lock-alt"></span> -->
                            <input id="value6" type="text" class="form-control" name="value6" required placeholder="Masukan Renaksi Value 1">
                        </div>
                        </div>
                    
                    <div class="mt-3 mb-2">
                        <input class="btn btn-primary w-100 waves-effect waves-light" type="submit" value="Submit">
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
                const response = await fetch('process.php', {
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