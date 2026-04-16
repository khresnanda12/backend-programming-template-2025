const models = require('../../../models');

// Ini buat ngecek apakah modelnya beneran kebaca sama template atau enggak
console.log('--> Model database yang aktif:', Object.keys(models));

const { Prize } = models;
const { GachaHistory } = models;

async function getUserHistoryToday(email, dateString) {
  if (!GachaHistory) throw new Error('Model GachaHistory GAGAL dimuat!');
  return await GachaHistory.findOne({ email, dateString });
}

async function incrementUserPlayCount(email, dateString) {
  if (!GachaHistory) throw new Error('Model GachaHistory GAGAL dimuat!');
  return await GachaHistory.findOneAndUpdate(
    { email, dateString },
    { $inc: { playCount: 1 } },
    { new: true, upsert: true }
  );
}

async function getAvailablePrizes() {
  if (!Prize) throw new Error('Model Prize GAGAL dimuat!');
  return await Prize.find({ remaining: { $gt: 0 } });
}

async function claimPrize(prizeId) {
  if (!Prize) throw new Error('Model Prize GAGAL dimuat!');
  return await Prize.findOneAndUpdate(
    { _id: prizeId, remaining: { $gt: 0 } },
    { $inc: { remaining: -1 } },
    { new: true }
  );
}

module.exports = {
  getUserHistoryToday,
  incrementUserPlayCount,
  getAvailablePrizes,
  claimPrize,
};
