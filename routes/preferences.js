const express = require("express");
const router = express.Router();
const controller = require("../service/preferences");

router.post("/", controller.saveUserPreference);
router.get("/", controller.getUserPreferences);

module.exports = router;
