import express from 'express';
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const json = require("./Products.json")

// const fileContents = fs.readFile('../Products.json', {encoding: 'utf-8'}, (err, result) =>{
//     if(err) {
//         throw err;
//     }else{
//         return result
//     }
// })

const app = express();

//TRAIGO TODOS LOS PRODUCTOS
app.get('/products',(req,res)=>{
    res.send(json)
})

//busco por ID 
app.get('/products/:pid', (req, res) =>{

    const {pid} = req.params;

    // const products = JSON.stringify(json)
    const products = json.find((p) => p.id === pid)

    if (!products){
        return res.status(404).send({error: `No existe el ID ${pid}`})
    }
        // res.send(products)
        res.json(products)
})

// app.get('/products', (req, res) =>{
//     req.query.limit = req.query.limit || 10;
//  const limit = parseInt(req.query.limit,10);
//  if(Number.isNaN(limit)){
//   return res.status(400).end();

//  }
//  res.json(users.slice(0,limit));
// })



app.listen(8080,()=>console.log("Listening on 8080"))