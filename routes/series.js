const express = require("express");
const router = express.Router();
const service = require("../service/series");

router.get("/", service.getAllSeries);

module.exports = router;
