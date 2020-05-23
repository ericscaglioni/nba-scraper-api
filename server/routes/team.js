const express = require('express');
const teamController = require('../controller/team');

const router = express.Router();

router.route('/:code').get(teamController.getTeam);

module.exports = router;
