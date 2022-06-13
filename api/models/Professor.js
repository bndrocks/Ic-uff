const mongoose =  require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const User = require("./User.js");
const escola = require("../models/Escola.js");
const arquivo = require("./Arquivo.js");

const professorSchema = new Schema({
    arquivos: [{
        type: Schema.Types.ObjectId,
        ref: "arquivo"
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