const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const Turma = require("./Turma.js");

const escolaSchema = new Schema({
    //escola
    nome: String
    
}, { collection: 'escolas' }
);
  
const escolaModel =  mongoose.Mongoose.model('escola', escolaSchema);
module.exports = {
    escolaSchema,
    escolaModel
}