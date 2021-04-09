const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.saveUserPreference);
router.get("/", controller.getUserPreferences);

module.exports = router;
