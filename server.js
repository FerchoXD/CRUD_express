require('dotenv').config();
const express = require('express')
const app = express();

let routes = require('./routes/routes');

// MongoDB
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Base de datos dbtest en MongoDB Local
mongoose.connect("mongodb://127.0.0.1:27017/dbtest",{useNewUrlParser: true,  useUnifiedTopology: true },function checkDb(error) {
    if(error) {
        console.log("Error conectando a la DB");
        console.log(error)
    }
    else {
        console.log("Conectado a la DB");
    }
});

app.use(express.json());
app.use(routes);

// 
app.listen(process.env.PORT, function check(error) {
    if(error)
        console.log("Error de inicio!");
    else
        console.log("Iniciado!");
});