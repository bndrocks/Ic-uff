const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const User = require("./User.js");
const {escolaSchema} = require("../models/Escola.js");

const escola = mongoose.Mongoose.model('escola', escolaSchema);
const Arquivos = require("./Arquivo.js");

const professorSchema = new Schema({
    arquivos: [{
        type: Schema.Types.ObjectId,
        ref: "Arquivos"
    }],
    escolas: [
        {
            escola: {
                type: Schema.Types.ObjectId,
                ref: "escola"
            },
            turmas: [ String ]
        }
    ],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }    
}, { collection: 'professores' }
);
 
module.exports =  mongoose.Mongoose.model('Professor', professorSchema);