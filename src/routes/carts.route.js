import {Router} from 'express';
import ProductManager from '../classes/product-manager.js';
import Carts from '../classes/cart-manager.js';


const routeCart = Router();

let filePathCart = './src/carts.json'
let cart = new Carts(`${filePathCart}`)

let product = new ProductManager('./src/Products.json');

routeCart.post('/', async(req,res) =>{
    try {
        const newCart = await cart.createNewCart();
        res.send(newCart)
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
});

routeCart.get('/', async(req,res) =>{
    try {
        const newCart = await cart.getAllCarts();
        res.send(newCart)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
});

routeCart.get('/:cid', async(req,res) =>{
    try {
        const getCart = await cart.getCartId(req.params.cid);
        res.send(getCart)
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

routeCart.post('/:cid/product/:pid', async (req, res) =>{
    try {
        let validProduct = await product.getProductId(parseInt(req.params.pid))
    
        if (validProduct) {
            const updateCart = await cart.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid))
            res.send(updateCart)
        }
        else {
            res.status(404).send(`Product with id ${req.params.pid} not found`)
        }
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})


export default routeCart;