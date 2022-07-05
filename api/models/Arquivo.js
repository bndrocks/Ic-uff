const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Professor = require("./Professor.js");

const arquivoSchema = new Schema({
    tema: String,
    conteudo: Array,
    professor: {
        type: Schema.Types.ObjectId,
        ref: "Professor"
    }
}, { collection: 'arquivos' }
);

module.exports = mongoose.model('arquivo', arquivoSchema);