import express from 'express';
import ProductManager from './product-manager.js';

const app = express();
const json = './Products.json';


//TRAIGO TODOS LOS PRODUCTOS
app.get('/products', async (req,res)=>{
    const response = await new ProductManager(json).
    getProducts()
    const {limit} = req.query;
    if(!limit){
        res.send(response)
     }
     //envia el filtrado de el numero de datos
    const filtered = response.splice(0,limit);
    res.send(filtered);
    

})

//busco por ID 
app.get('/products/:pid', async (req, res) =>{

    try{
        const {pid} = req.params;
        const response = await new ProductManager(json).
    getProductId(parseInt(pid))
        
        res.send(response)
    } catch(err) {
        res.status(404).send(`no exiiste${err}`)
    }
        
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