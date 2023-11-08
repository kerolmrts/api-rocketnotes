
const {hash, compare} = require ("bcryptjs");
const AppError = require ("../utils/AppError");

const sqliteConnection = require ("../database/sqlite");

class UsersController{
    //usando class e não function pq permite criar várias functions dentro
/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * create - POST para criar um registro.
 * update - PUT para utilizar um registro.
 * delete - DELETE para remover um registro.
 * Boa prática: usar só esses 5 métodos, se passar disso é melhor criar um outro controller
 */

  async create (request, response){
    const {name, email, password} = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get ("SELECT * FROM users WHERE email = (?)", [email])
    //o (?) é para substituir uma variável por outro valor que está dentro do vetor

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8)
    //o segundo parâmetro é o salt que é o fator de complexidade da senha
    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, hashedPassword]
    
    );

    return response.status(201).json();
 
  }


  async update (request, response){
    const {name, email, password, old_password} = request.body;
    const {id}= request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user){
      throw new AppError("Usuário não encontrado");
    }
    const userWithUpdatedEmail = await database.get ("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError ("Informe a senha antiga para definir uma nova",
      );
    }

    if (password && old_password){
      const checkOldPassword= await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha não confere");

      }
      user.password = await hash(password, 8);

    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, id]
    );
    return response.json();
  }

}

module.exports= UsersController;