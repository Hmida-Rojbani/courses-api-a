const mongoose = require('mongoose');
//mongodb://localhost:27017/DBNAME
mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/test-a-2?retryWrites=true&w=majority',
{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>console.log('Mongo is UP.'))
        .catch(err => console.log('Mongo is down. Raison :',err));
