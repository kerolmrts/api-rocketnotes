
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");
    //user_id é uma foreign key, pois é gerado dentro da tabela de usuário

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable("notes");
  
