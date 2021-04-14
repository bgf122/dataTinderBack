const express = require('express');

const router = express.Router();
const service = require('../service/mediaUrls');

router.get('/:id', service.getMediaUrl);

module.exports = router;
