module.exports = (mongoose) => {
  const gachaHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    dateString: { type: String, required: true },
    isWin: { type: Boolean, default: false },
    prizeName: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('GachaHistory', gachaHistorySchema);
};
