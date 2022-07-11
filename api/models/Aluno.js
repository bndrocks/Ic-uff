const mongoose =  require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const user = require("./User.js");
const escola = require("./Escola.js");

const alunoSchema = new Schema({
    escola:  {
        type: Schema.Types.ObjectId,
        ref: "escola"
    },
    turma: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { collection: 'alunos' }
);

const alunoModel = mongoose.Mongoose.model('aluno', alunoSchema);
module.exports = {
    alunoSchema,
    alunoModel
}