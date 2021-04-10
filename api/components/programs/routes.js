const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllPrograms);
router.get("/:id", controller.getProgram);
router.post("/genres", controller.getDistinctGenres);

module.exports = router;
