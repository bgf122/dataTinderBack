const express = require("express");
const router = express.Router();
const service = require("../service/programs");

router.get("/", service.getAllPrograms);
router.get("/:id", service.getProgram);

module.exports = router;
