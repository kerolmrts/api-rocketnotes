class AppError{
message;
statusCode;

//toda class tem um método constructor, que é carregado automaticamente quando é instanciado
constructor (message, statusCode = 400){
//se o StatusCode não for informado, seguirá o padrão setado de 400 (erro do cliente - bad request)
this.message = message;
this.statusCode= statusCode;
//usa o this para repassar as infos para o status global

}
}

module.exports = AppError;