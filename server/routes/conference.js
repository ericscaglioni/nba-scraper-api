const express = require('express');
const conferenceController = require('../controller/conference');

const router = express.Router();

router.route('/').get(conferenceController.getConferences);

module.exports = router;
