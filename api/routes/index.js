const routes = require("express").Router();

const programController = require("../controllers/programs.controller");

// Tämä pitäisi siirtää - ei ole varsinaisesti rajapintaan liittyvä reititys
routes.get("/", (req, res) => {
	res.send("<h1>DataTinder is online</h1>");
});

routes.get("/api/programs", programController.get_all_programs);
routes.get("/api/programs/:x", programController.get_random_program);

module.exports = routes;
