const express = require('express');
const router = express.Router();
const service = require('../service/votes');

router.post('/', service.saveUserData);
router.get('/', service.getUserData);

module.exports = router;
