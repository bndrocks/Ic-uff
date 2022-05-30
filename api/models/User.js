const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const {alunoSchema, alunoModel} = require("./Aluno.js");

const userSchema = new Schema({
    nome: String,
    email: String,
    tipo: String,
    senha: String,
    aluno: {
        type: Schema.Types.ObjectId,
        ref: "alunoModel"
    },
    professor: {
        type: Schema.Types.ObjectId,
        ref: "alunoModel"
    },
    /*pontuacoes: [{
        type: Schema.Types.ObjectId,
        ref: "Score"
    }]*/
}, { collection: 'users' }
);
 
module.exports =  mongoose.Mongoose.model('User', userSchema);