import {json, Router} from 'express';
import ProductManager from "../classes/product-manager.js";

let fileProducts = './src/Products.json'
let products = new ProductManager(`${fileProducts}`)


const routerViews = Router();
routerViews.use(json())

routerViews.get('/', async(req,res) =>{
    const prods = await products.getProducts()
    res.render('home', {prods})
})

routerViews.get('/real-time-products', async(req, res) =>{
    const prods = await products.getProducts()
    res.render('real_time_products', {prods,  style: "index"})
})

export default routerViews;