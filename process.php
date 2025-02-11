<?php

$url = "https://e-kinerja.kemenhub.go.id/skp/renaksi/editdetailitem";

// Get data from the HTML form (assuming you've already processed it)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $key = "renaksi";
    $realisasi = "realisasi";
    // $bukti = "bukti_dukung";
    $value = $_POST["value"];
    $value2 = $_POST["value2"];
    $docReal = "1 Document";
    $perReal = "100% Persen";
    // $bulReal = "1 Bulan";

    $id2 = $id + 2;
    $id3 = $id + 4;

    $postData = [
        'id' => $id,      // Include the ID
        'key' => $key,    // Include the Key
        'value' => $value,  // Include the Value
        // ... any other data required by the API ...
    ];

    $postData2 = [
        'id' => $id2,      // Include the ID
        'key' => $key,    // Include the Key
        'value' => $value,  // Include the Value
        // ... any other data required by the API ...
    ];

    $postData3 = [
        'id' => $id3,      // Include the ID
        'key' => $key,    // Include the Key
        'value' => $value,  // Include the Value
        // ... any other data required by the API ...
    ];

    $realisasiDoc = [
        'id' => $id,      // Include the ID
        'key' => $realisasi,    // Include the Key
        'value' => $docReal,  // Include the Value
        // ... any other data required by the API ...
    ];

    $realisasiDoc2 = [
        'id' => $id2,      // Include the ID
        'key' => $realisasi,    // Include the Key
        'value' => $perReal,  // Include the Value
        // ... any other data required by the API ...
    ];

    // $realisasiDoc3 = [
    //     'id' => $id3,      // Include the ID
    //     'key' => $realisasi,    // Include the Key
    //     'value' => $bulReal,  // Include the Value
    //     // ... any other data required by the API ...
    // ];

    $postString = http_build_query($postData);
    $postString2 = http_build_query($postData2);
    $postString3 = http_build_query($postData3);
    // $postString4 = http_build_query($realisasiDoc);
    // $postString5 = http_build_query($realisasiDoc2);
    // $postString6 = http_build_query($realisasiDoc3);

    $headers = [
        "Host: e-kinerja.kemenhub.go.id",
        "Cookie: _ga_B2LYNLLX1B=GS1.1.1737566083.9.1.1737566107.0.0.0; _ga=GA1.1.72744355.1734843507; _clck=2wm2yo%7C2%7Cfss%7C0%7C1817; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Imd3dkNRNW9uU2RpZmpKUmlFZk0zVkE9PSIsInZhbHVlIjoiaXE1OWRXRHQ4MkZCYkRENVdNcG9YcEZlN0pGdE51RXlxMFZGWEpRL1BFUWdPczRpQ3NlK3JkdFdybGNnVVVjbGVnbFlvRFB4eDl4ekdlZC9GSjhKRDFVYWVKSGVKVExLREszSWk2V0VVNXZpL05OM2lsU3liOG4rZlZZcSt0dFdKU0Y1YWdoQWdqY3ppYmprY3U0c0RSNTZLY0prWEtCczB4NGE3d0V5YjNOb3NlTWl4a2dXdjM1dzZrdzlDbStTT1dUMFYrekkwSjRnLzlneUVQc01XZHhpY2FTbGw1Qkh6UmpuU2wrNEhaZz0iLCJtYWMiOiIyYmEwMTE2ZTQ0NzZmNTEyMjA3ZDc0NDk2NWZkZjQwMzJmY2ZhYmM0NGZhNTM1Zjg5YmEwODMzZjVlOGZmNDQ3IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6ImV1ZHl2RllTTWE2dUNBNjhlMHQ5a0E9PSIsInZhbHVlIjoiTHJELzFKNnNXYVZXQmZuNVl2cmVpdTZrME1QRm9yN0ZBdngzUWljSU1KUWpIaVJheDg1MklNKzk1QXJzZ0IwUUdhb2kvTkRxNUo4WW92ME1YYzU0NlhaWXBuWjBRL0hqYTV3Q2NGRzcxYnNjT0gwYWtpVExZNG9UZGlVWlRSM3EiLCJtYWMiOiI0Yjc1YmEyNDU5N2ZmMGE1NDZhOWNjMTcxNGYxYjE3ZjI0MTI2ZDEwNzBhNTY1MGU5YjE2NDllOGEyZGM1OGYwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlZXSVpmelVZMlVaUWQyUzZQRVpoWEE9PSIsInZhbHVlIjoiMmkyUlc5VlZnOFdYQmdScCtRK1JRc0MzTWhTc1hYb3REZjE3NHhKS1lGUkxvQ2JpeXlPOThkTmxQMEhSWnREdUhRSk9WTVlOUzV2eW9xY3JlbDZCTEswcEhiQWl6SmdNRm5hR1NoV3ZRLzhEbUNhTnZzalhISTQ4UWZBbVRVYVYiLCJtYWMiOiI5YWM2N2RmZDNhZWMyYzE5MmFkMTA0NGE1NGFkZTdlMGQ0NDEzMjg4ODYwN2FjYTViNDdkN2I5OWJlZmFjNDBhIiwidGFnIjoiIn0%3D; TS0168dff9=01ad371bc41853d07e25e3755a6bb73592674c20d8b5aa11ac0741bd4adbf484d65223b463a44b6e1d722bdfca08c9e326119cddff62af5bd8f8675e835c368da7a4a1f2d9d2ba49d2e3c7026fd2b98dbc467bb25a", // **REPLACE with your actual cookies**
        "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
        "Accept: */*",
        "Accept-Language: en-US,en;q=0.5",
        "Accept-Encoding: gzip, deflate, br",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "X-Csrf-Token: tbnJcoYhxxxCgHkZvSary02lTKCmaFp0KHtTxBca", // **Get CSRF token dynamically (see function below)**
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

    $ch2 = curl_init($url);
    curl_setopt_array($ch2, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $postString2,
        CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
        CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    ]);

    $ch3 = curl_init($url);
    curl_setopt_array($ch3, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $postString3,
        CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
        CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    ]);

    // $ch4 = curl_init($url);
    // curl_setopt_array($ch4, [
    //     CURLOPT_POST => true,
    //     CURLOPT_RETURNTRANSFER => true,
    //     CURLOPT_HTTPHEADER => $headers,
    //     CURLOPT_POSTFIELDS => $postString4,
    //     CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
    //     CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    // ]);

    // $ch5 = curl_init($url);
    // curl_setopt_array($ch5, [
    //     CURLOPT_POST => true,
    //     CURLOPT_RETURNTRANSFER => true,
    //     CURLOPT_HTTPHEADER => $headers,
    //     CURLOPT_POSTFIELDS => $postString5,
    //     CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
    //     CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    // ]);

    // $ch6 = curl_init($url);
    // curl_setopt_array($ch6, [
    //     CURLOPT_POST => true,
    //     CURLOPT_RETURNTRANSFER => true,
    //     CURLOPT_HTTPHEADER => $headers,
    //     CURLOPT_POSTFIELDS => $postString6,
    //     CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
    //     CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
    // ]);


    $response = curl_exec($ch);
    $response2 = curl_exec($ch2);
    $response3 = curl_exec($ch3);
    // $response4 = curl_exec($ch4);
    // $response5 = curl_exec($ch5);
    // $response6 = curl_exec($ch6);

    if (curl_errno($ch)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => curl_error($ch)]);
    } else {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => $response]);
    }

    curl_close($ch);
}