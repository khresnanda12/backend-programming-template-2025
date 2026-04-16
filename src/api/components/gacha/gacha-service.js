const gachaRepository = require('./gacha-repository');

async function playGacha(email, fullName) {
  const today = new Date().toISOString().split('T')[0];

  const attempts = await gachaRepository.countDailyAttempts(email, today);
  if (attempts >= 5) throw new Error('LIMIT_REACHED');

  const isWin = Math.random() < 0.3;
  let wonPrize = null;

  if (isWin) {
    const prizes = await gachaRepository.getAvailablePrizes();
    if (prizes.length > 0) {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      wonPrize = await gachaRepository.claimPrize(randomPrize._id);
    }
  }

  await gachaRepository.createRecord({
    email,
    fullName,
    dateString: today,
    isWin: !!wonPrize,
    prizeName: wonPrize ? wonPrize.name : null,
  });

  return wonPrize ? `Menang ${wonPrize.name}` : 'Zonk';
}

async function getMaskedWinners() {
  const winners = await gachaRepository.getAllWinners();
  return winners.map((w) => ({
    prize: w.prizeName,
    name:
      w.fullName.length > 2
        ? `${w.fullName[0]}****${w.fullName.slice(-2)}`
        : `${w.fullName}****`,
  }));
}

module.exports = {
  playGacha,
  getMaskedWinners,
  getHistory: gachaRepository.getHistoryByEmail,
  getQuotas: gachaRepository.getPrizeQuotas,
};
