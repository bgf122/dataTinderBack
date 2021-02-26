const express = require('express');
const router = express.Router();
const programs = require('../../programs');


router.get('/', (req, res) => res.json(programs));

module.exports = router;