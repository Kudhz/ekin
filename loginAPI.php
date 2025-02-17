<?php

$url = "https://e-kinerja.kemenhub.go.id/auth";

// Get data from the HTML form (assuming you've already processed it)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["v_username"];
    $password = $_POST["v_password"];
    $token = $_POST["_token"];
    $cookie = $_POST["cookie1"];
    $captcha = $_POST["v_captcha"];

    $login = [
        '_token' => $token,      // Include the ID
        'v_username' => $username,    // Include the Key
        'v_password' => $password,  // Include the Value
        'v_captcha' => $captcha,  // Include the Value
        // ... any other data required by the API ...
    ];

    $headers = [
        "Host: e-kinerja.kemenhub.go.id",
        "Cookie: $cookie",
        "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
        "Accept: */*",
        "Accept-Language: en-US,en;q=0.5",
        "Accept-Encoding: gzip, deflate, br",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "X-Csrf-Token: $token", // **Get CSRF token dynamically (see function below)**
        "X-Requested-With: XMLHttpRequest",
        // "Content-Length: " . strlen($postString6),
        "Origin: https://e-kinerja.kemenhub.go.id",
        "Referer: https://e-kinerja.kemenhub.go.id/auth/login", // **Verify correct Referer**
        "Sec-Fetch-Dest: empty",
        "Sec-Fetch-Mode: cors",
        "Sec-Fetch-Site: same-origin",
        "Priority: u=0",
        "Te: trailers",
        "Connection: keep-alive",
    ];

    $postString7 = http_build_query($login);

    $ch7 = curl_init($url);
    curl_setopt_array($ch7, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $postString7,
        CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
        CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    ]);
    
    $response7 = curl_exec($ch7);


    if (curl_errno($ch7)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => curl_error($ch7)]);
    } else {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => $response7]);
    }

    curl_close($ch7);

    }
    
