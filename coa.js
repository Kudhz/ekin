(async function () {
  try {
    // Data yang akan dikirim (jika ada)
    const data = new URLSearchParams({
      // Contoh: tambahkan key-value berdasarkan kebutuhan
      key1: "value1",
      key2: "value2",
      // Tambahkan data yang diperlukan lainnya
    });

    const response = await fetch(
      "https://e-kinerja.kemenhub.go.id/skp/renaksi/editdetailitem"
    );

    // Memeriksa status respons
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Menangani respons
    const responseBody = await response.text(); // atau .json() jika berbentuk JSON
    console.log("Respons:", responseBody);
  } catch (error) {
    console.error("Error:", error);
  }
})();
