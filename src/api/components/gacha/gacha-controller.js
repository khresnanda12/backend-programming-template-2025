const gachaService = require('./gacha-service');

async function playGacha(req, res, next) {
  try {
    const { email, fullName } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ message: 'Email & Nama wajib isi' });
    }

    const result = await gachaService.playGacha(email, fullName);
    return res.status(200).json({ success: true, message: result });
  } catch (err) {
    if (err.message === 'LIMIT_REACHED') {
      return res
        .status(403)
        .json({ success: false, message: 'Jatah harian habis' });
    }
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const data = await gachaService.getHistory(req.query.email);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getQuotas(req, res, next) {
  try {
    const data = await gachaService.getQuotas();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getWinners(req, res, next) {
  try {
    const data = await gachaService.getMaskedWinners();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  playGacha,
  getHistory,
  getQuotas,
  getWinners,
};
