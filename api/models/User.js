const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const Score = require("./Score.js");

const userSchema = new Schema({
    nome: String,
    email: String,
    tipo: String,
    senha: String,
    pontuacoes: [{
        type: Schema.Types.ObjectId,
        ref: "Score"
    }]
}, { collection: 'users' }
);
 
module.exports =  mongoose.Mongoose.model('User', userSchema);