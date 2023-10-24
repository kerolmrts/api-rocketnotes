const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.get("/", notesController.index); //não precisa do user_id, pois vai ser passado por uma query
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
