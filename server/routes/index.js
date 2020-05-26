const express = require('express');
const router = express.Router();
const conferenceRoute = require('./conference');
const teamRoute = require('./team');

// Rota para validarmos se a api está atualizada.
router.get('/status-api', (req, res) =>
  res.json({
    status: 'ok'
  })
);

router.use('/conferences', conferenceRoute);
router.use('/team', teamRoute);

module.exports = router;
