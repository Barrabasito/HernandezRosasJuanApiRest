const express = require('express');//npm i express
const jsonwebtoken = require('jsonwebtoken');//npm i jsonwebtoken
const mysql = require('mysql2/promise'); // Importa la versión de promesas de mysql2
require('dotenv').config();//npm i dotenv
const bodyParser = require('body-parser');//npm install body-parser
const cors = require('cors');//npm install cors
//npm install gridjs express

const app = express();
app.use(express.json());
app.use(cors());
// Middleware para procesar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


const secretKey = 'Clave secreta';
const PORT = 8060;

const db = mysql.createConnection({host:'localhost', user:'root', password:'',database:'banco'});

//Generar Token
app.post('/token', async (req, res, next) =>{
  var token = jsonwebtoken.sign(req.body, secretKey);
  console.log(token);
  res.json({ token });
});

// Ruta para crear un nuevo cliente
app.post('/clientes', verificarToken, async (req, res) => {
  const { usuario, password, nombre, edad, calle, ciudad, correo, fecha_registro } = req.body;

  try { 
    const [result] = await (await db).query(
      'INSERT INTO cliente (usuario, password, nombre, edad, calle, ciudad, correo, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [usuario, password, nombre, edad, calle, ciudad, correo, fecha_registro]
    );
    res.json({ mensaje: 'Cliente creado con éxito' });
  } catch (err) {
    console.error('Error al crear un cliente:', err);
    res.status(500).json({ error: 'Error al crear un cliente' });
  }
});

// Ruta para obtener la lista de clientes
app.get('/clientes', verificarToken, async (req, res) => {
  try {
    const [rows] = await (await db).query('SELECT * FROM cliente');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener la lista de clientes:', err);
    res.status(500).json({ error: 'Error al obtener la lista de clientes' });
  }
});

// Ruta para obtener un cliente
app.get("/clientes/:id", verificarToken, async(req,res)=>{    
  console.log(req.params.id)
  const[rows,fields]=await (await db).query('SELECT * from cliente where id_cliente='+req.params.id);
  if(rows.length==0)
  {
   res.status(484).json({mensaje:"El Cliente no existe"});
  }else{
   res.json(rows);
  }
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', verificarToken, async (req, res) => {
  const id = req.params.id;
  const { usuario, password, nombre, edad, calle, ciudad, correo, fecha_registro } = req.body;

  try {
    const [result] = await (await db).query(
      'UPDATE cliente SET usuario=?, password=?, nombre=?, edad=?, calle=?, ciudad=?, correo=?, fecha_registro=? WHERE id_cliente = ?',
      [usuario, password, nombre, edad, calle, ciudad, correo, fecha_registro, id]
    );
    res.json({ mensaje: 'Cliente actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar un cliente:', err);
    res.status(500).json({ error: 'Error al actualizar un cliente' });
  }
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', verificarToken, async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await (await db).query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
    res.json({ mensaje: 'Cliente eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar un cliente:', err);
    res.status(500).json({ error: 'Error al eliminar un cliente' });
  }
});

function verificarToken(req,res,next){
    console.log(req.headers.authorization);
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    jsonwebtoken.verify(token, secretKey, function(err,decoded){
        if(err){
            res.status(500).json({error:"Acceso no permitido, Token no válido"});
        }else{
            next();
        }
    });
}

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
