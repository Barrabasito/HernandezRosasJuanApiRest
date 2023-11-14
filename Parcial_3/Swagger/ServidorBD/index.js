//modulo npm i express
//npm install express-basic-auth
//npm install express body-parser
//npm i swagger-ui-express
//npm i swagger-jsdoc
//npm i swagger-themes
const { SwaggerTheme } = require('swagger-themes');
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
//npm install redoc-express
const redoc = require('redoc-express');

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use(cors());
const theme = new SwaggerTheme('v3');

const options = {
   explorer: true,
   customCss: theme.getBuffer('monokai')
 };

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
/**
 * @swagger
 * /clientes/:
 *   get:
 *     tags:
 *       - cliente
 *     summary: consultar clientes
 *     description: Descripcion de peticion a la ruta clientes/id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del cliente
 *     responses:
 *       200:
 *         desciption: Informacion del cliente
 *         type: json
 */ 
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

 const def = fs.readFileSync(path.join(__dirname,'/swagger.json'),{encoding: 'utf8',flag:'r'});
 const defObj = JSON.parse(def);

 const read = fs.readFileSync(path.join(__dirname,'/README.md'),{encoding: 'utf8',flag:'r'});

 defObj.info.description = read;

 const swaggerOptions={
    definition:defObj,
    apis: [`${path.join(__dirname,"./index.js")}`],
 }


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.use("/api-docs-json",(req,res)=>{
   res.json(swaggerDocs);
});


 // define title and specUrl location
 // serve redoc
 app.get(
   '/api-docs-redoc',
   redoc({
     title: 'API Docs',
     specUrl: '/api-docs-json',
     nonce: '', // <= it is optional,we can omit this key and value
     // we are now start supporting the redocOptions object
     // you can omit the options object if you don't need it
     // https://redocly.com/docs/api-reference-docs/configuration/functionality/
     redocOptions: {
       theme: {
         colors: {
           primary: {
             main: '#6EC5AB'
           }
         },
         typography: {
           fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
           fontSize: '15px',
           lineHeight: '1.5',
           code: {
             code: '#87E8C7',
             backgroundColor: '#4D4D4E'
           }
         },
         menu: {
           backgroundColor: '#ffffff'
         }
       }
     }
   })
 );
 

app.listen(8084,()=>{
    console.log("Servidor express escuchando en el puerto 8084");
});
//npm i morgan
//npm i mysql
//npm i mysql2
//redoc express instalar te va generar otro tipo de documentacion