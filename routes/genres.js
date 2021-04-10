const express = require("express");
const router = express.Router();
const controller = require("../service/genres");

router.get("/", controller.getDistinctGenres);

module.exports = router;