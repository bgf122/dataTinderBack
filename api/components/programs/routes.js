const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllPrograms);
router.get("/:id", controller.getProgram);

module.exports = router;
