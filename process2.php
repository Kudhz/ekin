<?php

$url = "https://e-kinerja.kemenhub.go.id/skp/renaksi/editdetailitem";

// Get data from the HTML form (assuming you've already processed it)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $key = "renaksi";
    $realisasi = "realisasi";
    $bukti = "bukti_dukung";
    $drive = "https://drive.google.com/drive/folders/1r67Z-AID_BG7xP6kNBBN509U4Jk0uLW-?usp=sharing";
    $realValue = array ("1 Document", "100 Persen", "1 Bulan");
    $realIndex = 0;

    for ($i = 0; $i < 18; $i++) {
        $id = $_POST["id"];
        $currentId = $id + ($i * 2);
        
        $renaksi = [
            'id' => $currentId,      // Include the ID
            'key' => $key,    // Include the Key
            'value' => $realValue[$realIndex],  // Include the Value
            // ... any other data required by the API ...
        ];

        $realIndex = ($realIndex + 1) % 3;

        $headers = [
            "Host: e-kinerja.kemenhub.go.id",
            "Cookie: _ga_B2LYNLLX1B=GS1.1.1737566083.9.1.1737566107.0.0.0; _ga=GA1.1.72744355.1734843507; _clck=2wm2yo%7C2%7Cfss%7C0%7C1817; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Imd3dkNRNW9uU2RpZmpKUmlFZk0zVkE9PSIsInZhbHVlIjoiaXE1OWRXRHQ4MkZCYkRENVdNcG9YcEZlN0pGdE51RXlxMFZGWEpRL1BFUWdPczRpQ3NlK3JkdFdybGNnVVVjbGVnbFlvRFB4eDl4ekdlZC9GSjhKRDFVYWVKSGVKVExLREszSWk2V0VVNXZpL05OM2lsU3liOG4rZlZZcSt0dFdKU0Y1YWdoQWdqY3ppYmprY3U0c0RSNTZLY0prWEtCczB4NGE3d0V5YjNOb3NlTWl4a2dXdjM1dzZrdzlDbStTT1dUMFYrekkwSjRnLzlneUVQc01XZHhpY2FTbGw1Qkh6UmpuU2wrNEhaZz0iLCJtYWMiOiIyYmEwMTE2ZTQ0NzZmNTEyMjA3ZDc0NDk2NWZkZjQwMzJmY2ZhYmM0NGZhNTM1Zjg5YmEwODMzZjVlOGZmNDQ3IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6InBBeUY5L1NnWjNHY2JGQTZiWXpaZHc9PSIsInZhbHVlIjoicS83cHA3V1ZTa1p0eDdMNS9ORFYvaTlsRjNQMVRqQThGWUZQSHdkRlJYRUpMTUlxRU5zY0VwVWVEbmVCck91ZUhoVWthOVlmdVJPR1Y4YzZkY1c1M1UrVi9FSWxSUFE4WW90SU9rajJmczZwdGxTaG1iOWZGYUFHUTN0eWF2eFQiLCJtYWMiOiI0OWE4OGM0NjQ5YjQxMDhkZTgxNWM5MzA5M2Q2OGViYjNiZDU1MWQ2YjM5YmI0NDMwNDlmNzhlZmIxOWEwMzA0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InVWcHFRaU9OZ0ptVThoL3J4L3RYalE9PSIsInZhbHVlIjoidTYzbG1tODdHMUZIT3JFcGdFc3F6cEJOeXNjbTBkanlUaG9obU9janAzQ2ZLZGYxR0lTWUlESDRKam0zUUZsMTBYTjVYVmhiNFV6Z2poVVhjUmJjN0N1aytIeU96aUFqQXRRcGpWR0hMVGhxek03OTR5UUdrMnArdzNvSGZZTnkiLCJtYWMiOiI4YmUwOTRlZTRkM2MzN2Y4YTM5OWY5ZDQxYTEzNGY5NzgxZDMzYWJhYjZhNGQ3OWIyNjc1NjE0ZWQ5OWQ1MmQzIiwidGFnIjoiIn0%3D; TS0168dff9=01ad371bc4632b428ad3c22bc198e0145fbdddbbe1d7c02849198764d36a503930fe0302e1dfc20f04f75787067415fa1568bc258d52bf9e8957b89844c75e1b97d61146fd07836cdff42b335b2f5e88c6750cf403",
            "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
            "Accept: */*",
            "Accept-Language: en-US,en;q=0.5",
            "Accept-Encoding: gzip, deflate, br",
            "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
            "X-Csrf-Token: dm3EMIdYqcxn1t8I7OxkQMWdGHIWhu1V8I74Gt9S", // **Get CSRF token dynamically (see function below)**
            "X-Requested-With: XMLHttpRequest",
            // "Content-Length: " . strlen($postString6),
            "Origin: https://e-kinerja.kemenhub.go.id",
            "Referer: https://e-kinerja.kemenhub.go.id/skp/renaksi/262030", // **Verify correct Referer**
            "Sec-Fetch-Dest: empty",
            "Sec-Fetch-Mode: cors",
            "Sec-Fetch-Site: same-origin",
            "Priority: u=0",
            "Te: trailers",
            "Connection: keep-alive",
        ];

        $postString7 = http_build_query($renaksi);

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
    
}
