Berikut adalah penjelasan mengenai endpoint yang dapat diakses pada sistem Gacha Undian ini. Seluruh endpoint berjalan secara lokal pada port 5000.

1. Endpoint Bermain Gacha

- URL Akses: `http://localhost:5000/api/gacha/play`
- Method: `POST`
- Input/Parameter yang diperlukan: Memerlukan _request body_ dengan format JSON yang wajib berisi key `email` dan `fullName`.
- Contoh Input: ```json
  {
  "email": "khresnanda12@gmail.com",
  "fullName": "Khresnanda Putra Wirawan"
  }

2. Endpoint Riwayat Gacha

- URL Akses: `http://localhost:5000/api/gacha/history`
- Method: `GET`
- Input/Parameter yang diperlukan: Memerlukan query parameter berupa email pada URL untuk memfilter riwayat permainan pengguna tertentu.
- Contoh Cara Akses: `http://localhost:5000/api/gacha/history?email=khresnanda12@gmail.com`

3. Endpoint Sisa Kuota Hadiah

- URL Akses: `http://localhost:5000/api/gacha/prizes`
- Method: `GET`
- Input/Parameter yang diperlukan: Tidak memerlukan parameter atau input apa pun. Endpoint ini bisa langsung dipanggil untuk melihat daftar stok hadiah.

4. Endpoint Daftar Pemenang Tersensor

- URL Akses: `http://localhost:5000/api/gacha/winners`
- Method: `GET`
- Input/Parameter yang diperlukan: Tidak memerlukan parameter atau input apa pun. Endpoint ini akan mengembalikan daftar pemenang yang namanya sudah disamarkan secara otomatis.
