const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).json({rspuesta:"respuesta get a ruta cliente"});
}).post('/',(req,res) => {
    res.status(200).json({rspuesta:"respuesta post a ruta cliente"});
}).delete('/',(req,res) => {
    res.status(200).json({rspuesta:"respuesta delete a ruta cliente"});
})
module.exports.router = router;