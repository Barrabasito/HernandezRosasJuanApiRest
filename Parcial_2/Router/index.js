const express = require('express');
const cliente = require('./router/cliente.js');
const app = express();

app.use('/clientes',cliente.router);
app.listen(8084,function(err){
   if (err) console.log(err);
   console.log("Servidor escuchando en el puerto 8084")
})