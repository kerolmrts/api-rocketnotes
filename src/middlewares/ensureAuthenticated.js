const {verify} = require("jsonwebtoken");
const AppError= require("../utils/AppError");
const authConfig= require("../configs/auth");

function ensureAuthenticated(request, response, next){

    const authHeader= request. headers.authorization; // o token do usuário estará aqui dentro;
    if(!authHeader){ // se o token não existir

        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" "); // cria um array para pegar a segunda posição e já coloca na variável token
    
    try{
       const{sub: user_id} = verify(token, authConfig.jwt.secret); //p/ verificar se é um token válido || o sub é o conteúdo armazenado || quando usa : é um propriedade que consegue desestruturar do resultado
   // se o token for válido, retorna o sub que é um alias -- muda o nome 
   request.user={
   id: Number(user_id)
   };
   return next(); // chamar a próxima função
    }catch{
        throw new AppError("JWT Token inválido", 401);  
    }
}

module.exports= ensureAuthenticated;