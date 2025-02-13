<?php

$url = "https://e-kinerja.kemenhub.go.id/skp/renaksi/editdetailitem";

// Get data from the HTML form (assuming you've already processed it)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cookie = $_POST["cookie"];
    $csrf = $_POST["csrf"];
    $key = "renaksi";
    $realisasi = "realisasi";
    $bukti = "bukti_dukung";
    $value1 = $_POST["value1"];
    $value2 = $_POST["value2"];
    $value3 = $_POST["value3"];
    $value4 = $_POST["value4"];
    $value5 = $_POST["value5"];
    $value6 = $_POST["value6"];
    $values = [$value1, $value2, $value3, $value4, $value5, $value6];
    $totalValues = count($values);
    $realValue = array ("1 Document", "100 Persen", "1 Bulan");
    $realIndex = 0;
    $drive = "https://drive.google.com/drive/folders/1r67Z-AID_BG7xP6kNBBN509U4Jk0uLW-?usp=sharing";

    for ($i = 0; $i < 18; $i++) {
        $id = $_POST["id"];
        $currentId = $id + ($i * 2);
        $value = $values[floor($i / 3) % $totalValues];
        $renaksi = [
            'id' => $currentId,      // Include the ID
            'key' => $key,    // Include the Key
            'value' => $value,  // Include the Value
            // ... any other data required by the API ...
        ];

        $realisasi2 = [
            'id' => $currentId,      // Include the ID
            'key' => $realisasi,    // Include the Key
            'value' => $realValue[$realIndex],  // Include the Value
            // ... any other data required by the API ...
        ];

        $realIndex = ($realIndex + 1) % 3;

        $buktiDukung = [
            'id' => $currentId,      // Include the ID
            'key' => $bukti,    // Include the Key
            'value' => $drive,  // Include the Value
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
            "X-Csrf-Token: $csrf", // **Get CSRF token dynamically (see function below)**
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
        $postString8 = http_build_query($realisasi2);
        $postString9 = http_build_query($buktiDukung);

        $ch7 = curl_init($url);
        curl_setopt_array($ch7, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postString7,
            CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
            CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
        ]);

        $ch8 = curl_init($url);
        curl_setopt_array($ch8, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postString8,
            CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
            CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
        ]);

        $ch9 = curl_init($url);
        curl_setopt_array($ch9, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postString9,
            CURLOPT_SSL_VERIFYPEER => false, // **DO NOT DISABLE IN PRODUCTION**
            CURLOPT_SSL_VERIFYHOST => false, // **DO NOT DISABLE IN PRODUCTION**
        ]);
        

        $response7 = curl_exec($ch7);
        $response8 = curl_exec($ch8);
        $response8 = curl_exec($ch9);

        if (curl_errno($ch7)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => curl_error($ch7)]);
        } else {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message']);
        }
    
        curl_close($ch7);
        curl_close($ch8);
        curl_close($ch9);
    }
    
}
