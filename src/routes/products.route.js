import { Router, urlencoded } from "express";
import ProductManager from "../classes/product-manager.js";

const routeProducts = Router();

let fileProducts = './src/Products.json'

let products = new ProductManager(`${fileProducts}`)

routeProducts.get('/', async(req, res) =>{
    res.send(await products.getProducts())
});

routeProducts.get('/:pid', async (req, res) =>{
    try{
        const {pid} = req.params;
        const response = await products.
    getProductId(parseInt(pid))
        
        res.send(response)

    } catch(err) {
        res.status(404).send(`no exiiste${err}`)
    }
})

routeProducts.post('/', async(req, res) =>{
    try {
        const productAdd = await products.addProduct(req.body)

        console.log(req.body)
        res.send(productAdd)
     } catch (error) {
        res.status(404).send(`error ${error}`)
    }
});

routeProducts.put('/:pid', async (req,res) =>{
    try {
        const {pid} = req.params;
        const productChange = await products.updateProduct(parseInt(pid), req.body )
        console.log(req.body)
        res.send(productChange)
        
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

routeProducts.delete('/:pid', async(req, res) =>{
    try {
        const {pid} = req.params;
        const deletProduct = await products.deleteProduct(parseInt(pid))
        res.send(deletProduct)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

export default routeProducts;