const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:id", controller.getMediaUrl);

module.exports = router;
