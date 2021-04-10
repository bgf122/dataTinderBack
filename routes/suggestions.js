const express = require("express");
const router = express.Router();
const service = require("../service/suggestions");

router.get("/:amount", service.getSuggestions);

module.exports = router;
