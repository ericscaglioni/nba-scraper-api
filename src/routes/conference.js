const express = require('express');
const conference = require('../controller/conference');

const router = express.Router();

router.route('/').get(conference.getConferences);

module.exports = router;
