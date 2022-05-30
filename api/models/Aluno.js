const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const User = require("./User.js");
const {escolaModel} = require("./Escola.js")
const {scoreModel} = require("./Score.js");
const Turma = require("./Turma.js");

const alunoSchema = new Schema({
    escola:  {
        type: Schema.Types.ObjectId,
        ref: "escolaModel"
    },
    turma: Number,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { collection: 'alunos' }
);

const alunoModel = mongoose.Mongoose.model('aluno', alunoSchema);
module.exports = {
    alunoSchema,
    alunoModel
}