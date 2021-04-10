const express = require("express");
const router = express.Router();
const service = require("../service/preferences");

router.post("/", service.saveUserPreference);
router.get("/", service.getUserPreferences);

module.exports = router;
