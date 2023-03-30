import { Router, urlencoded } from "express";
import {ProductManager} from "../dao/index.js";

const productsRouter = Router();
// const fileProducts = './src/dao/file-managers/files/Products.json'
let products = new ProductManager();

productsRouter.get('/', async(req, res) =>{
    const prods = await products.getProducts()
    try {
        const { limit} = req.query;
        if(! limit){
            res.send(prods)
        } else{
            const filtered = prods.splice(0, limit);
            res.send(filtered);
        }

    } catch (error) {
        res.status(404).send(`Ops... algo malió sal${error}`)
    }

});

productsRouter.get('/:pid', async (req, res) =>{
    try{
        const {pid} = req.params;
        const response = await products.
    getProductId(parseInt(pid))
        
        res.status(201).send({status: 'ok', payload: response})

    } catch(err) {
        res.status(404).send(`no exiiste${err}`)
    }
})

productsRouter.post('/', async(req, res) =>{
    try {
        const { title, description, price, thumbnails, code, stock, category } = req.body

        if(!title || !description || !price || !code || !stock || !category){
            return res.status(400).send({status: 'error', payload: 'Todos los campos son requeridos'})
        } 
        if (typeof title !== "string" || typeof description !== "string" || typeof price !== "number" || typeof code !== "string" || typeof stock !== "number"|| typeof category !== "string" ) {
            return res.status(400).send({status: 'error', payload:'Invalid type'})
        }
        const productAdd = await products.addProduct({title, description, price, thumbnails, code, stock, category});

        res.status(201).send({status: 'ok', payload: productAdd})
        
     } catch (error) {
        res.status(404).send(`error ${error}`)
    }
});

productsRouter.put('/:pid', async (req,res) =>{
    try {
        const {pid} = req.params;
        const productChange = await products.updateProduct(parseInt(pid), req.body )
        
        res.status(201).send({status: 'ok', payload: productChange})
        
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

productsRouter.delete('/:pid', async(req, res) =>{
    try {
        const {pid} = req.params;
        const deletProduct = await products.deleteProduct(parseInt(pid))
        
        res.send(deletProduct)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

export default productsRouter;