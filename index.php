<!DOCTYPE html>
<html>
<>
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
    <form id="form" action="process.php" method="post" onsubmit="return handleSubmit(event)">
    <div class="container">
            <strong>Renaksi:</strong><br>
            <div class="alert alert-success message" id="success-message">Data submitted successfully!</div>
            <div class="malert alert-danger message" id="error-message"></div>
            ID: <input type="text" name="id"  class="form-control"id="id" required><br>
        <!-- Key: <input type="text" name="key2" class="form-control" id="key2" required><br> -->
        <!-- Value Realisasi: <textarea name="value" class="form-control" id="value" cols="50" rows="10"></textarea><br> -->
        Value: <textarea name="value" class="form-control d-none" id="value" cols="50" rows="10">
Menyusun Laporan kegiatan performance check peralatan listrik yang digunakan sebagai dasar pelaksanaan koordinasi dengan unit kerja
Menyampaikan Laporan Dokumen Laporan kegiatan performance check peralatan listrik kepada pimpinan</textarea><br>
        <input type="submit" class="btn btn-primary" value="Send">
    </div>
    </form>
    

    
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