//npm init -y
//npm install express
//npm i joi
const validation = require("./middleware/joiValidation")
const {registroSchema} = require("./schemas/registro")
const express=require('express');
const app=express();

//Nos serviran para capturadar los datos
app.use(express.json());
// Middleware 
app.use(express.urlencoded({ extended: false })); 


//ALTAS
 app.post("/clientes", validation(registroSchema), (req, res) => {
       const { usuario, password, confirmar_password,nombre, edad, calle, ciudad, correo, fecha_registro } = req.body;
       res.send(`usuario:${usuario},password:${password},confirmar_password:${confirmar_password},nombre:${nombre}, edad:${edad}, 
       calle:${calle}, ciudad:${ciudad}, correo:${correo}, fecha_registro:${fecha_registro}`);
});


app.listen(8090,()=>{
    console.log("Servidor express escuchando en el puerto 8090");
});
