const mongoose = require('mongoose');

const prizesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quota: { type: Number, required: true },
  remaining: { type: Number, required: true },
});

const Prize =
  mongoose.models.Prize_Kuis || mongoose.model('Prize_Kuis', prizesSchema);

const PRIZES = [
  { name: 'Emas 10 gram', quota: 1, remaining: 1 },
  { name: 'Smartphone X', quota: 5, remaining: 5 },
  { name: 'Smartwatch Y', quota: 10, remaining: 10 },
  { name: 'Voucher Rp100.000', quota: 100, remaining: 100 },
  { name: 'Pulsa Rp50.000', quota: 500, remaining: 500 },
];

async function seed() {
  try {
    const URI = 'mongodb://localhost:27017/demo-db';
    await mongoose.connect(URI);
    console.log('✅ Terhubung ke MongoDB');
    await Prize.deleteMany({});
    await Prize.insertMany(PRIZES);
    console.log('🎉 Hadiah resmi berhasil dimasukkan!');
  } catch (err) {
    console.error('❌ Gagal seed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}
seed();
