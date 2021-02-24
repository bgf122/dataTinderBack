const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Get all programs
router.get('/', controller.get_all_programs);

// Get Specific program by id
router.get('/:programId', controller.get_program);

// Get random program
router.get("/api/programs/x", controller.get_random_program);

module.exports = router;