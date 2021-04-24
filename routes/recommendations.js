const express = require('express');

const router = express.Router();
const service = require('../service/recommender');

router.get('/', service.getRecommendation);
router.get('/programId/', service.getSimilarItems);

module.exports = router;
