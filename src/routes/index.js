
//Para não precisar usar o "const usersRoutes = require ("./routes/users.routes")" e poluir o server.js
//a missão do index.js será reunir todas as rotas da aplicação que estarão separadas por arquivos
const {Router} = require("express");
const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes")

const routes=Router();

routes.use("/users", usersRouter)
//ou seja, toda vez que acessar o users, será redirecionado para o usersRouter, que é o grupo de rotas do usuário
//então dentro do user.routes, não precisa ter o /users, mas apenas a "/"
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;
