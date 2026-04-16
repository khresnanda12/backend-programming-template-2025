const mongoose = require('mongoose');

// 1. Definisikan schema langsung di sini
const prizesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quota: { type: Number, required: true },
  remaining: { type: Number, required: true },
});

const Prize = mongoose.models.Prize || mongoose.model('Prize', prizesSchema);

// 2. Data hadiah yang akan dimasukkan
const PRIZES = [
  { name: 'Voucher Belanja 50rb', quota: 5, remaining: 5 },
  { name: 'Tumbler Eksklusif', quota: 10, remaining: 10 },
  { name: 'Tiket Nonton', quota: 3, remaining: 3 },
];

async function seed() {
  try {
    // 3. KITA HARDCODE URL DATABASE-NYA DI SINI
    const URI = 'mongodb://localhost:27017/demo-db';

    await mongoose.connect(URI);
    console.log('✅ Terhubung ke MongoDB (Mode Seeding)');

    await Prize.deleteMany({});
    console.log('🗑️  Data hadiah lama dihapus');

    const inserted = await Prize.insertMany(PRIZES);
    console.log(`🎉 ${inserted.length} data hadiah berhasil ditambahkan!`);
  } catch (err) {
    console.error('❌ Gagal seed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Koneksi ditutup.');
    process.exit(0);
  }
}

seed();
