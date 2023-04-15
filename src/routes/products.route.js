import { Router } from "express";
// import {ProductManager} from "../dao/index.js";
// import isAuthenticated from "../middleware/auth.middleware.js";
import ProductManager from "../dao/db-managers/product.manager.js";


const productsRouter = Router();

const productManger = new ProductManager() 

productsRouter.get('/', async (req, res) => {
    try {
        const products = await productManger.getProducts(req);
        res.json(products)
        res.render('products', { products })
    } catch (err) {
        res.status(404).send(`Ops... algo malió sal${err}`)
    }
});


productsRouter.get('/:pid', async (req, res) =>{
    try{
        const {pid} = req.params;
        const response = await productManger.
    getProductId(pid)
        
        res.send( response)

    } catch(err) {
        res.status(404).send(`no exiiste${err}`)
    }
})

productsRouter.post('/', async(req, res) =>{
    const newProduct ={
        ...req.body
    }
    try {
        const response = await productManger.addProduct(newProduct)
        res.send(response)
        // const { title, description, price, thumbnails, code, stock, category } = req.body

        // if(!title || !description || !price || !code || !stock || !category){
        //     return res.status(400).send({status: 'error', payload: 'Todos los campos son requeridos'})
        // } 
        // if (typeof title !== "string" || typeof description !== "string" || typeof price !== "number" || typeof code !== "string" || typeof stock !== "number"|| typeof category !== "string" ) {
        //     return res.status(400).send({status: 'error', payload:'Invalid type'})
        // }
        // const productAdd = await products.addProduct({title, description, price, thumbnails, code, stock, category});

        // res.status(201).send({status: 'ok', payload: productAdd})
        
     } catch (error) {
        res.status(404).send(`error ${error}`)
    }
});

productsRouter.put('/:pid', async (req,res) =>{
    const {pid} = req.params;
    // const product = req.body;

    try {
        const productChange = await productManger.updateProduct(pid, req.body)
        
        res.status(201).send({status: 'ok', payload: productChange})
        
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

productsRouter.delete('/:pid', async(req, res) =>{
    const {pid} = req.params;
    try {
        const deletProduct = await productManger.deleteProduct(pid)
        
        res.send(deletProduct)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

export default productsRouter;