const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.get_all_programs);

router.get("/:id", controller.get_program);

module.exports = router;
