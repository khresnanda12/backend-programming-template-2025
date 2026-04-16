module.exports = (mongoose) => {
  const gachaHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    dateString: { type: String, required: true },
    playCount: { type: Number, default: 0 },
  });

  // Wajib direturn sebagai fungsi mongoose.model
  return mongoose.model('GachaHistory', gachaHistorySchema);
};
