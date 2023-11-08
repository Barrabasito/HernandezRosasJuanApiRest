//modulo npm i express
//npm install express-basic-auth
//npm install express body-parser
//npm i swagger-ui-express
//npm i swagger-jsdoc
const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const app=express();
var cors=require('cors');
const basicAuth = require('express-basic-auth');
//express body-parser
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use(cors());

// Middleware para procesar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar el middleware de autenticación básica
const auth = basicAuth({
   users: { 'Barrabasito': '1234' }, // Aquí debes proporcionar tu usuario de GitHub y tu token personal
   challenge: true, // Esto enviará un encabezado WWW-Authenticate para solicitar autenticación
   unauthorizedResponse: 'Acceso no autorizado', // Mensaje en caso de autenticación fallida
 });
 
 // Ruta protegida que requiere autenticación
 app.get('/ruta-protegida', auth, (req, res) => {
   res.send('¡Acceso permitido!');
 });


//app.use(express.json());
//CONSULTAS
app.get("/clientes",async(req,res)=>{    
    try{
        const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'banco'})
        const[rows,fields]=await conn.query('SELECT * from cliente');
        res.json(rows);
    }catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
    }
});

app.get("/clientes/:id",async(req,res)=>{    
   console.log(req.params.id)
   const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'banco'})
   const[rows,fields]=await conn.query('SELECT * from cliente where id_cliente='+req.params.id);
   if(rows.length==0)
   {
    res.status(484).json({mensaje:"Usuario No existe"});
   }else{
    res.json(rows);
   }
});

//ALTAS
// app.post("/clientes", async (req, res) => {
//    try {
//       const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });

//       const { nombre, calle, ciudad } = req.body;
//       await conn.query('INSERT INTO cliente (nombre_cliente, calle_cliente, ciudad_cliente) VALUES (?, ?, ?)', [nombre, calle, ciudad]);

//       res.json({ mensaje: "Cliente creado exitosamente" });
//    } catch (err) {
//       res.status(500).json({ mensaje: err.sqlMessage });
//    }
// });

// Ruta para procesar el formulario
app.post('/clientes', (req, res) => {
   const nombre = req.body.nombre;
   const calle = req.body.calle;
   const ciudad = req.body.ciudad;

   //Datos recibidos
   const respuesta = {
       mensaje: 'Datos recibidos con éxito',
       nombre: nombre,
       calle: calle,
       ciudad: ciudad
   };

   res.json(respuesta);
});

//BAJAS
app.delete("/clientes", async (req, res) => {
    try {
       const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });
 
       const [checkRows, checkFields] = await conn.query('SELECT * FROM cliente WHERE id_cliente = ?', [req.query.id_cliente]);
       if (checkRows.length === 0) {
          res.status(404).json({ mensaje: "El cliente no existe" });
       } else {
          await conn.query('DELETE FROM cliente WHERE id_cliente = ?', [req.query.id_cliente]);
          res.json({ mensaje: "Cliente eliminado exitosamente" });
       }
    } catch (err) {
       res.status(500).json({ mensaje: err.sqlMessage });
    }
 });

//ACTULIZACIONES
app.put("/clientes", async (req, res) => {
    try {
       const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });
 
       const [checkRows, checkFields] = await conn.query('SELECT * FROM cliente WHERE id_cliente = ?', [req.query.id_cliente]);
       if (checkRows.length === 0) {
          res.status(404).json({ mensaje: "El cliente no existe" });
       } else {
         console.log(req.body);
          const { nombre, calle, ciudad } = req.body; 
          await conn.query('UPDATE cliente SET nombre_cliente = ?, calle_cliente = ?, ciudad_cliente = ? WHERE id_cliente = ?', [nombre, calle, ciudad, req.query.id_cliente]);
          res.json({ mensaje: "Cliente actualizado exitosamente" });
       }
    } catch (err) {
       res.status(500).json({ mensaje: err.sqlMessage });
    }
 });



 const swaggerOptions = {
   definition: {
   openapi: '3.0.0',
   info: {
   title: 'API Empleados',
   version: '1.0.0',
   },
   servers:[
   {url: "http://localhost:8083"}
   ],
   },
   apis: [`${path.join(__dirname,"./routes/ruta_empleado.js")}`],
   };

   const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));


app.listen(8083,()=>{
    console.log("Servidor express escuchando en el puerto 8083");
});
//npm i morgan
//npm i mysql
//npm i mysql2