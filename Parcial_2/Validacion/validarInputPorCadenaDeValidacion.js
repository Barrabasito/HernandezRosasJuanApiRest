//npm i express-validator
//npm i express
const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post('/clientes', [
    check('id_cliente').isNumeric(),
    check('edad').isNumeric().withMessage("Debe ser una edad válida"),
    check("correo","Correo válido").isEmail(),
    // Agrega más validaciones según tus requisitos
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log(req.body);
        res.json({ mensaje: "Respuesta a petición POST éxitosa" });
    } else {
        res.status(400).json({ errores: errors.array() });
    }
});

app.listen(8090, () => {
    console.log("Servidor Express escuchando en el puerto 8090");
});
//Un framework de texteo
//uno de esos es express-validator
//Moca es viejito
//Texteo, documentacion de manejo de errores explicarlo y exentar