//npm i express-validator
//npm i express
const express = require('express');
const { validationResult } = require('express-validator');
const { clienteValidacionescheckSchema } = require('./validaciones.js'); // Ruta de las validaciones
const app = express();

app.use(express.json());

app.post('/clientes', clienteValidacionescheckSchema, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log(req.body);
    res.json({ mensaje: "Respuesta a petición POST exitosa" });
  } else {
    res.status(400).json({ errores: errors.array() });
  }
});

app.listen(8090, () => {
  console.log("Servidor Express escuchando en el puerto 8090");
});
