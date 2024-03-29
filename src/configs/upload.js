const path= require("path");
const multer= require("multer");
const crypto= require ("crypto");

const TMP_FOLDER= path.resolve(__dirname,"..", "..", "tmp");
const UPLOADS_FOLDER= path.resolve(__dirname, "uploads");

const MULTER={
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash= crypto.randomBytes(10).toString("hex"); //formato hexadecimal
            const fileName= `${fileHash}-${file.originalname}`; //evita que tenha nomes iguais
        return callback(null, fileName);
        },
    }),
};

module.exports={
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}