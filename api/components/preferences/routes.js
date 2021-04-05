const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.saveUserPreference);

module.exports = router;
