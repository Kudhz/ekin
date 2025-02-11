<?php

$url = "https://e-kinerja.kemenhub.go.id/skp/renaksi/editdetailitem";

// Get data from the HTML form (assuming you've already processed it)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $key = $_POST["key"];
    $value = $_POST["value"];

    $postData = [
        'id' => $id,      // Include the ID
        'key' => $key,    // Include the Key
        'value' => $value,  // Include the Value
        // ... any other data required by the API ...
    ];

    $postString = http_build_query($postData);

    $headers = [
        "Host: e-kinerja.kemenhub.go.id",
        "Cookie: _ga_B2LYNLLX1B=GS1.1.1737566083.9.1.1737566107.0.0.0; _ga=GA1.1.72744355.1734843507; _clck=2wm2yo%7C2%7Cfss%7C0%7C1817; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Imd3dkNRNW9uU2RpZmpKUmlFZk0zVkE9PSIsInZhbHVlIjoiaXE1OWRXRHQ4MkZCYkRENVdNcG9YcEZlN0pGdE51RXlxMFZGWEpRL1BFUWdPczRpQ3NlK3JkdFdybGNnVVVjbGVnbFlvRFB4eDl4ekdlZC9GSjhKRDFVYWVKSGVKVExLREszSWk2V0VVNXZpL05OM2lsU3liOG4rZlZZcSt0dFdKU0Y1YWdoQWdqY3ppYmprY3U0c0RSNTZLY0prWEtCczB4NGE3d0V5YjNOb3NlTWl4a2dXdjM1dzZrdzlDbStTT1dUMFYrekkwSjRnLzlneUVQc01XZHhpY2FTbGw1Qkh6UmpuU2wrNEhaZz0iLCJtYWMiOiIyYmEwMTE2ZTQ0NzZmNTEyMjA3ZDc0NDk2NWZkZjQwMzJmY2ZhYmM0NGZhNTM1Zjg5YmEwODMzZjVlOGZmNDQ3IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IjIvbi9YTFlDc05kbldpdU5XWUlrblE9PSIsInZhbHVlIjoick02VWdCTE9RNmpMbUZJWSt5NmlpdFFmSFJOemVLNVNJWEt6dE1RdGE4UHNTdkMzbHd2Vm5Qc0Z2ZnNkc0dvMWJ4bTFBMTM1T1ZTYkcwU2g1SW13K0o0eDlZYjQ5NE1ncjV1b2Vva2d1MGIyUGZMaSsrTThNWVJrOEJ4T0dWVGQiLCJtYWMiOiJjZDJlZDgxMjAwOTI0MDA5MzU3OTQ3NzcwMzVjN2VjMWExY2U4YzdhODczMDI0NTc1OWVlYjg0NGQ0YzU4NzNjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImtEN1RaTEdLb2pVQ0JnRFFwR0dxcmc9PSIsInZhbHVlIjoiajUwMjNBVnZYUmE5MzVjK0hZRnJTbEVEZy9DK08zUmRGbG43blNab2dGMmVoUkEyNkRwOHZvRlBtS0xpN2w5TWVKVkdiTkI1TUJvTzJwb3FsVFJWci9ET2NVY1l3SElLRU9yZUlaSmgwc1R4WklYcWZKSm1IQ3B5ZHZ1bFNHS1YiLCJtYWMiOiIwODM2OTFmMzQxNzYyN2RmYThhOWMzZWQzZmZiZmMwYWFhZDRhYWQ3N2YzNjZmYzI3MDc0YTBjODlkOGFkY2VkIiwidGFnIjoiIn0%3D; TS0168dff9=01ad371bc4263b99d0cb125d01c892c54ea4f701dd67d486c67bf867ccd350d1c7aec0f2a806b65c1ad9fa0194271bb0ec7fced300fa0a3898f8da8f17bb2187e3afb79281d9c71eddef0b50de232d9b12d1c348ab", // **REPLACE with your actual cookies**
        "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
        "Accept: */*",
        "Accept-Language: en-US,en;q=0.5",
        "Accept-Encoding: gzip, deflate, br",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "X-Csrf-Token: 928eaXJl9Ou2vUPdf58JqUNsMXvloM7MahpAHKcV", // **Get CSRF token dynamically (see function below)**
        "X-Requested-With: XMLHttpRequest",
        "Content-Length: " . strlen($postString),
        "Origin: https://e-kinerja.kemenhub.go.id",
        "Referer: https://e-kinerja.kemenhub.go.id/skp/renaksi/262030", // **Verify correct Referer**
        "Sec-Fetch-Dest: empty",
        "Sec-Fetch-Mode: cors",
        "Sec-Fetch-Site: same-origin",
        "Priority: u=0",
        "Te: trailers",
        "Connection: keep-alive",
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $postString,
        CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
        CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => curl_error($ch)]);
    } else {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => $response]);
    }

    curl_close($ch);
}