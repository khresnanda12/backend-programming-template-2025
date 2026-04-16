const express = require('express');
const gachaController = require('./gacha-controller');

const router = express.Router();

module.exports = (app) => {
  app.use('/gacha', router);

  router.post('/play', gachaController.playGacha);
  router.get('/history', gachaController.getHistory);
  router.get('/prizes', gachaController.getQuotas);
  router.get('/winners', gachaController.getWinners);
};
