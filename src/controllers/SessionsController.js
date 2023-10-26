class SessionsController{
    async create(request, response){
        const {email, password} = request.body; //desestruturação 

            return response.json({email, password}) //devolve o conteúdo que vem dentro do request.body


    }
}
module.exports= SessionsController;