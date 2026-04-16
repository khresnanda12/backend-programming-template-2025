module.exports = (mongoose) => {
  const prizesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quota: { type: Number, required: true },
    remaining: { type: Number, required: true },
  });

  // Wajib direturn sebagai fungsi mongoose.model agar terbaca oleh index.js template
  return mongoose.model('Prize', prizesSchema);
};
