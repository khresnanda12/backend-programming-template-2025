const mongoose = require('mongoose');

// 1. Definisikan Schema
const prizeKuisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quota: { type: Number, required: true },
  remaining: { type: Number, required: true },
});

const historyKuisSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  dateString: { type: String, required: true },
  isWin: { type: Boolean, default: false },
  prizeName: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// 2. Buat Model
const PrizeModel =
  mongoose.models.Prize_Kuis || mongoose.model('Prize_Kuis', prizeKuisSchema);
const HistoryModel =
  mongoose.models.History_Kuis ||
  mongoose.model('History_Kuis', historyKuisSchema);

// 3. Fungsi-fungsi Repository
async function countDailyAttempts(email, dateString) {
  return await HistoryModel.countDocuments({ email, dateString });
}

async function getAvailablePrizes() {
  return await PrizeModel.find({ remaining: { $gt: 0 } });
}

async function claimPrize(prizeId) {
  return await PrizeModel.findOneAndUpdate(
    { _id: prizeId, remaining: { $gt: 0 } },
    { $inc: { remaining: -1 } },
    { new: true }
  );
}

async function createRecord(data) {
  return await HistoryModel.create(data);
}

async function getHistoryByEmail(email) {
  return await HistoryModel.find({ email }).sort({ createdAt: -1 });
}

async function getPrizeQuotas() {
  return await PrizeModel.find({}, 'name quota remaining -_id');
}

async function getAllWinners() {
  return await HistoryModel.find({ isWin: true }, 'fullName prizeName');
}

module.exports = {
  countDailyAttempts,
  getAvailablePrizes,
  claimPrize,
  createRecord,
  getHistoryByEmail,
  getPrizeQuotas,
  getAllWinners,
};
