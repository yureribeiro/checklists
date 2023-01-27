//configuração do mongoose

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://yureribeiro:yureribeiro@cluster0.8hkkrxh.mongodb.net/test')
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.log(err))
