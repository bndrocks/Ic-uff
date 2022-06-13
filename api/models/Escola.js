const mongoose =  require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;

const escolaSchema = new Schema({
    nome: String
    
}, { collection: 'escolas' }
);
  
module.exports =  mongoose.Mongoose.model('escola', escolaSchema);
