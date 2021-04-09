const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:amount", controller.getSuggestions);

module.exports = router;
