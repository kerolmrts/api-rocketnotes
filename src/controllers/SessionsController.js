const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body; //desestruturação

    const user = await knex("users").where({ email }).first(); //first - para garantir que irá retornar apenas um
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);
    if(!passwordMatched){
        throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    return response.json({ email, password }); //devolve o conteúdo que vem dentro do request.body
  }
}
module.exports = SessionsController;
