const express = require("express");
const router = express.Router();
const service = require("../service/kmeans");

router.get("/", service.testKmeans);


module.exports = router;
