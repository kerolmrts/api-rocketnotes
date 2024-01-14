const knex = require("../database/knex");
const { compare }= require("bcryptjs")
const AppError = require("../utils/AppError");
const authConfig= require("../configs/auth");
const { sign } = require("jsonwebtoken");

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

    const {secret, expiresIn }= authConfig.jwt;
    const token= sign({}, secret,{
        subject: String(user.id), //converte em string
        expiresIn

    })

    return response.json({ user, token }); //devolve o conteúdo que vem dentro do request.body
  }
}
module.exports = SessionsController;
