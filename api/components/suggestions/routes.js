const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.get_one_suggestion);
router.get("/:amount", controller.get_multiple_suggestions);

module.exports = router;
