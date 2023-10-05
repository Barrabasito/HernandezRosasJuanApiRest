const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(cors());

// Middleware para manejar errores
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// CONSULTA
app.get("/clientes/:id", async (req, res, next) => {
   try {
      console.log(req.params.id);
      const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });
      const [rows, fields] = await conn.query('SELECT * from cliente where id_cliente=' + req.params.id);
      if (rows.length == 0) {
         //Error
         let error = new Error("El Cliente no existe");
         throw error;
      } else {
         res.json(rows);
      }
   } catch (err) {
      //Next
      next(err);
   }
});

// ALTA
app.post("/clientes", async (req, res, next) => {
   try {
      const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });
      const { nombre, edad, calle, ciudad } = req.body;
      await conn.query('INSERT INTO cliente (nombre_cliente, edad, calle_cliente, ciudad_cliente) VALUES (?, ?, ?, ?)', [nombre, edad, calle, ciudad]);
      res.json({ mensaje: "Cliente creado exitosamente" });
   } catch (err) {
      //Error
      let error = new Error("No se pudo agregar el Cliente " + err);
      //Next
      next(error);
   }
});

app.listen(8090, () => {
   console.log("Servidor express escuchando en el puerto 8090");
});
