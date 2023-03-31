import {json, Router} from 'express';
// import ProductManager from "../dao/file-managers/product.manager.js";
// import CartManager from "../dao/file-managers/cart.manager.js"
import { ProductManager, CartManager } from '../dao/index.js';

// let fileProducts = './src/Products.json'
// let products = new ProductManager()

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager()

viewsRouter.use(json())

viewsRouter.get('/products', async(req,res) =>{
    const prods = await productManager.getProducts()
    res.render('products', {prods, style: "index"})
})

viewsRouter.get('/real-time-products', async(req, res) =>{
    const prods = await productManager.getProducts()
    res.render('real_time_products', { style: "index"})
})

viewsRouter.get('/carts', async (req, res) =>{
    const cart = await cartManager.getAllCarts()
    // console.log(cart)
    res.render('carts', {cart, style: 'index'})
});

viewsRouter.get("/chat", async (req,res)=>{
    res.render("chat", {style: "index"})
})

export default viewsRouter;