<!DOCTYPE html>
<html>
<head>
    <title>Send Data</title>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <h1 class="d-flex justify-content-center" >Form Ekin JMT</h1>
    <div class="container justify-content-center">
    <div class="w-25">
  <label for="id" class="form-label w-50">ID</label>
  <input type="email" class="form-control" id="id" placeholder="1234">
</div>
<div class="w-25">
  <label for="key" class="form-label w-50">KEY</label>
  <input type="email" class="form-control" id="key" placeholder="renaksi">
</div>
<div class="mb-3">
  <label for="value" class="form-label w-50">VALUE</label>
  <textarea class="form-control" id="value" rows="3"></textarea>
</div>
<button type="button" class="btn btn-primary" onclick="return kirimData()">Submit</button>
</div>
    <div class="message success" id="success-message">Data submitted successfully!</div>
    <div class="message error" id="error-message"></div>
    <script>
        function kirimData() {
            let id1 = document.getElementById("id").value;

            kirimRequest(1, id1);

            let id2 = parseInt(id1) + 2;
            kirimRequest(2, id2);

            let id3 = parseInt(id1) + 4;
            kirimRequest(3, id3);
        }

        function kirimRequest(requestNumber, id) {
            let key = document.getElementById("key").value;
            let value = document.getElementById("value").value;
            let data = `id=${id}&key=${key}&value=${value}`;

            fetch("e-kinerja.kemenhub.go.id", {
                method: "POST",
                header: { "Host: e-kinerja.kemenhub.go.id",
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
                },
                body: data
            })
            .then(response => response.text())
            .then(result => {
                console.log("Response dari request " + requestNumber + ":" , result);
            })
            .catch(error => {
                console.error("Error pada request" + requestNumber + ":" , error);
            })
        }
    </script>
</body>
</html>