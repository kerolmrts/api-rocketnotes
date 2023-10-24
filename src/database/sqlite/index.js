const sqlite3= require ("sqlite3"); // o que estabelece a conexão
const sqlite= require ("sqlite"); // o que se conecta
const path = require ("path");
//o path é um biblioteca do node que resolve os endereços de acordo com o ambiente


async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve (__dirname,"..", "database.db"),
        //filename é onde o arquivo ficará salvo
        //__ dirname pega, de forma automática, onde vc está dentro do projeto
        // ".." anda uma pasta para trás
        // "database.db" cria um arquivo dentro da pasta database
        driver: sqlite3.Database
    });
    return database;
 
}
module.exports = sqliteConnection;


//SGBD - Sistema Gerenciador de Banco de Dados - ferramenta para visualizar o que tem dentro do banco
// Usar Beekeeper 