
const {Router} = require("express");

const UsersController = require ("../controllers/UsersController")
const ensureAuthenticated= require("../middlewares/ensureAuthenticated");
const usersRoutes= Router();


// function myMiddleware(request, response, next){
//         console.log("você passou pelo middleware")
//         if(!request.body.isAdmin){
//         return response.json({message: "user não autorizado"})
//         };

//         next(); //se não tiver isso, vai ficar em loop


// }

const usersController = new UsersController();
// //users.Routes.use (MmyMiddleware); - aplica para todas as rotas de usuário, se quiser usar em uma rota, acrescenta abaixo:
usersRoutes.post ("/", usersController.create);
usersRoutes.put ("/:id", ensureAuthenticated, usersController.update);

// usersRoutes.post("/", (request, response) => {
        // const {name, email, password} = request.body - obs: foi p pag controller
        //infos que estão sendo passadas na API
       
        // response.send(`Usuário:${name}. E-mail:${email}. e a senha é: ${password}`);
        //É possível passar as infos usando send ou o próprio json(objeto):
        // response.json({name, email, password}); - obs: foi p pag controller
        


//expor as rotas para o servidor poder alcança-las:
module.exports= usersRoutes;