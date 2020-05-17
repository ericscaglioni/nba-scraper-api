const express = require('express');
const router = express.Router();
const conference = require('./conference');

// Rota para validarmos se a api está atualizada.
router.get('/api-status', (req, res) =>
  res.json({
    status: 'ok',
  }),
);

router.use('/conferences', conference);

module.exports = router;
