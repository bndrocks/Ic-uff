const mongoose = require('mongoose');
//alterar o endereço
mongoose.connect('mongodb+srv://admin:bndrocksxbox360@cluster0.h7opx.mongodb.net/test?authSource=admin&replicaSet=atlas-blsrt0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true').then(res => console.log(res));
//mongodb+srv://admin:bndrocksxbox360@cluster0.h7opx.mongodb.net/UFF?retryWrites=true&w=majority

module.exports = { Mongoose: mongoose }