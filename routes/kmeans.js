const express = require('express');

const router = express.Router();
const service = require('../service/kmeans');

router.get('/', service.getKmeansSuggestion);

module.exports = router;
