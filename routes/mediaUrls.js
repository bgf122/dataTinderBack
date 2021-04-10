const express = require("express");
const router = express.Router();
const controller = require("../service/mediaUrls");

router.get("/:id", controller.getMediaUrl);

module.exports = router;
