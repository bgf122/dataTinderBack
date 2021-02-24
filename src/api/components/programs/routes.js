const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Get all programs or a random programs with ?random={number}
router.get('/', controller.get_all_programs);

// Get Specific program by id
router.get('/:programId', controller.get_program);



module.exports = router;