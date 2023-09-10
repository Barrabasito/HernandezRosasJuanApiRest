//modulo npm i express
const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const app=express();

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));

//app.use(express.json());

app.get("/usuarios",async(req,res)=>{    
    try{
        const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'analizadorlexico'})
        const[rows,fields]=await conn.query('SELECT * from matriz');
        res.json(rows);
    }catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
    }
});

app.get("/usuarios/:id",async(req,res)=>{    
   console.log(req.params.id)
   const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'analizadorlexico'})
   const[rows,fields]=await conn.query('SELECT * from matriz where estado='+req.params.id);
   if(rows.length==0)
   {
    res.status(484).json({mensaje:"Usuario No existe"});
   }else{
    res.json(rows);
   }
});

app.listen(8080,()=>{
    console.log("Servidor express escuchando en el puerto 8080");
});
//npm i morgan
//npm i mysql
//npm i mysql2