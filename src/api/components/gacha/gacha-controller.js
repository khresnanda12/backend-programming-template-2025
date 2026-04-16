const gachaService = require('./gacha-service');

async function play(req, res) {
  try {
    console.log('--> Data request masuk dari EchoAPI:', req.body);

    // Amankan kalau body dari Echo API ternyata kosong
    const email = req.body?.email;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'Email belum diisi di tab Body Echo API!' });
    }

    const result = await gachaService.playGacha(email);

    // Kalau limit habis, sesuai syarat kuis harus return error
    if (result.isLimit) {
      return res.status(403).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('--> WADUH CRASH:', error.message);
    // Kita TAMPILKAN error aslinya langsung ke Echo API!
    return res.status(500).json({
      pesan: 'Server Error',
      ALASAN_ASLI: error.message,
    });
  }
}

module.exports = { play };
