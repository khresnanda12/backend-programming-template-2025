const gachaRepository = require('./gacha-repository');

async function playGacha(email) {
  // Format tanggal YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // 1. Cek kuota
  const history = await gachaRepository.getUserHistoryToday(email, today);
  if (history && history.playCount >= 5) {
    return {
      success: false,
      isLimit: true,
      message: 'Limit Gacha Harian Habis (Maksimal 5x)',
    };
  }

  // 2. Tambah hitungan main
  await gachaRepository.incrementUserPlayCount(email, today);

  // 3. Logic Gacha (40% menang)
  const isWin = Math.random() < 0.4;
  if (!isWin) {
    return { success: true, message: 'Zonk! Kamu tidak dapat hadiah.' };
  }

  // 4. Cari hadiah
  const availablePrizes = await gachaRepository.getAvailablePrizes();
  if (availablePrizes.length === 0) {
    return {
      success: true,
      message: 'Menang! Tapi sayang kuota semua hadiah sudah habis.',
    };
  }

  // 5. Pilih hadiah random
  const randomIndex = Math.floor(Math.random() * availablePrizes.length);
  const selectedPrize = availablePrizes[randomIndex];

  const claimResult = await gachaRepository.claimPrize(selectedPrize._id);
  if (!claimResult) {
    return {
      success: false,
      message: 'Gagal klaim, hadiah direbut orang lain.',
    };
  }

  return { success: true, message: `Hore! Kamu dapat: ${claimResult.name}` };
}

module.exports = { playGacha };
