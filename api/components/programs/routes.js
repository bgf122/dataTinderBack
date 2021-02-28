const express = require("express");
const router = express.Router();
const controller = require("./controller");


router.get("/", controller.get_all_programs);


router.get("/:id", controller.get_program);

// Get random-sample using POST instead of GET.
router.post("/:random", controller.get_random_sample);

module.exports = router;
