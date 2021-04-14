const express = require('express');

const router = express.Router();
const service = require('../service/movies');

router.get('/', service.getAllMovies);

module.exports = router;
