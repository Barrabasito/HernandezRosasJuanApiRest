const { checkSchema } = require('express-validator');

const clienteValidacionescheckSchema = checkSchema({
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
});

module.exports = {
    clienteValidacionescheckSchema,
};
