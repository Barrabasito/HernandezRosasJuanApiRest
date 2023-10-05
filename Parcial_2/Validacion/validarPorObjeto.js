//npm i express-validator
//npm i express
const express = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const app = express();

app.use(express.json()); // Middleware para procesar datos JSON en las solicitudes

app.post('/clientes', checkSchema({
  'id_cliente': {
    isLength: {
      options: { min: 5, max: 10 },
      errorMessage: 'El ID del cliente debe tener entre 5 y 10 caracteres',
    },
  },
  'edad': {
    isNumeric: {
      errorMessage: 'Debe ser una edad válida',
    },
  },
  'correo': {
    isEmail: {
      errorMessage: 'Correo válido requerido',
    },
  },
  // Agrega más validaciones según tus requisitos
}), (req, res) => {
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
