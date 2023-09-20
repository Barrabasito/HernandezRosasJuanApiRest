//modulo npm i express
const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const app=express();
var cors=require('cors');

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use(cors());

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
app.post("/clientes", async (req, res) => {
   try {
      const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });

      const { nombre, calle, ciudad } = req.body;
      await conn.query('INSERT INTO cliente (nombre_cliente, calle_cliente, ciudad_cliente) VALUES (?, ?, ?)', [nombre, calle, ciudad]);

      res.json({ mensaje: "Cliente creado exitosamente" });
   } catch (err) {
      res.status(500).json({ mensaje: err.sqlMessage });
   }
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

app.listen(8080,()=>{
    console.log("Servidor express escuchando en el puerto 8080");
});
//npm i morgan
//npm i mysql
//npm i mysql2