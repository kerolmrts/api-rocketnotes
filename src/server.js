require ("express-async-errors")
const migrationsRun = require ("./database/sqlite/migrations")
const AppError = require ("./utils/AppError")
const express= require ("express");
const routes = require ("./routes") //por padrão vai carregar o index.js

migrationsRun();

const app = express(); //para inicializar o express
app.use(express.json());
//precisa dizer para a API qual é o formato que virá no corpo da requisição, neste caso, json

app.use(routes);


app.use ((error, request, response,next) =>{
    if (error instanceof AppError){
    return response.status (error.statusCode).json ({
   status:"error",
   message: error.message
    });
}
console.error(error);
return response.status(500).json({
    status: "error",
    message: "Internal server error"
})


})

app.get("/message/:id/:user", (request, response) => {
    //: para entender que o que vem a seguir é um parâmetro 
    //: id o parâmetro pode ter o nome que quiser
    //: id/ : user pode colocar quantos parâmetros quiser, basta separar por /
   
   
    // response.send(`Mensagem ID: ${request.params.id}.
    // Para o usuário: ${request.params.user}.
    // `) Como está repetindo o request, é possível desestruturar o código:

    });


     
  
const PORT= 3333; //para poder mudar a porta de forma fácil
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`));


// Os routes params são obrigatórios, porque faz parte do endereço
//diferente de uma query que é opcional
// então se colocar localhost:3333/users sem colocar a página e o limite, vai funcionar
// mas com o params só funciona localhost:3333/message/6/kerolayne

//colocar um recurso que fique observando toda vez que o código mudar (salvar), o servidor reinicie de forma automática para não ficar iniciando o servidor toda hora
// instalar biblioteca nodemon --save-dev 
//(ESSE FINAL é pq o nodemon vai ser uma dependência de desenvolvimento, ou seja, só se quer usar o nodemon enquanto estiver desenvolvendo a aplicação)
// npm significa node package manager 