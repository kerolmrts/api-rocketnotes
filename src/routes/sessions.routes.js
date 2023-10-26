const {Router} = require("express");


const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController()//instancia a classe na memória e aloca na constante

const sessionsRoutes= Router();
sessionsRoutes.post("/", sessionsController.create)

module.exports= sessionsRoutes;
