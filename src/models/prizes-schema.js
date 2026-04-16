module.exports = (mongoose) => {
  const prizesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quota: { type: Number, required: true },
    remaining: { type: Number, required: true },
  });

  return mongoose.model('Prize', prizesSchema);
};
