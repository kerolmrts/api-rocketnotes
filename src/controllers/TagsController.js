const knex = require("../database/knex")

class TagsController {
    async index(request, response) {
        const {user_id} = request.params;
     
        const tags = await knex("tags")
        .where({user_id}) //filtra onde seja igual ao user_id /obs: não repete o nome user_id pq é igual a tabela

        return response.json(tags);
    }
}

module.exports = TagsController;