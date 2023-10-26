const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });
    //insere a nota recuperando o código da nota que foi inserida
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
        //transforma a url em link
      };
    });
    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);
    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const note = await knex("notes").where({ id }).first(); //usa id como parâmetro
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("create_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("notes").where({ id }).delete();
    return response.json();
  }

  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let notes;
    if (tags) {
      const filterTags= tags.split(",").map(tag => tag.trim()) //converte o texto em array, utilizando como delimitador a vírgula

     notes = await knex("tags") //pesquisa com base nas tags
     .select([
      //seleciona campos de tabelas diferentes. Nome da tabela+nome do campo:
      "notes.id",
      "notes.title",
      "notes.user_id",
     ])
     .where("notes.user_id", user_id) //filtra com base no id do usuário
     .whereLike("notes.title", `%${title}%`)
     .whereIn("name", filterTags)// analisar baseado na tag; Pega o name e passa o vetor que será comparado para saber se a tag existe ou não
     .innerJoin("notes", "notes.id", "tags.note_id")//conecta tabela notes com os campos de id e notes_id
     .orderBy("notes.title") //organizar por ordem alfabética o título
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`) //ajuda a buscar por valores que estejam dentro de uma palavra da busca; obs: utiliza % para buscar antes e depois
        .orderBy("title");
    }

    const userTags = await knex("tags").where({user_id});// filtro em todas as tags onde a tag seja igual ao id do usuário
    const notesWithTags= notes.map(note =>{ //percorre todas as notas
      const noteTags= userTags.filter(tag => tag.note_id === note.id)//filtra as tags da nota
      return{
        ...note, //todos os detalhes da nota, desestrutura e passa para note tags:
        tags:noteTags

      }
    })

    return response.json(notesWithTags);
  }
}
module.exports = NotesController;
