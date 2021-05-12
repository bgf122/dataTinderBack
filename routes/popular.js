const express = require('express');

const router = express.Router();
const service = require('../service/programs');

router.get('/', service.getPopularPrograms);

module.exports = router;
