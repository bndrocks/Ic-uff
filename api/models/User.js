const mongoose =  require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const {alunoModel} = require("./Aluno.js");
const {Professor} = require("./Professor.js");
const professorModel = mongoose.Mongoose.model('Professor', Professor);

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
        ref: "professorModel"
    }
}, { collection: 'users' }
);
 
module.exports =  mongoose.Mongoose.model('User', userSchema);