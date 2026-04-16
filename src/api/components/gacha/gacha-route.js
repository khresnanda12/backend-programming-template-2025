// gacha-route.js — ubah ke pola template
const express = require('express');
const gachaController = require('./gacha-controller');

module.exports = (app) => {
  const router = express.Router();

  app.use('/gacha', router);

  router.post('/play', gachaController.play);
};
