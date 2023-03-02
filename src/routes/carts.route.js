import {Router} from 'express';
import ProductManager from '../classes/product-manager.js';
import Carts from '../classes/cart-manager.js';


const routeCart = Router();

let filePathCart = './src/carts.json'
let cart = new Carts(`${filePathCart}`)

let product = new ProductManager('./src/Products.json');

routeCart.post('/', async(req,res) =>{
    const newCart = await cart.createNewCart();
    res.send(newCart)
});

routeCart.get('/', async(req,res) =>{
    const newCart = await cart.getAllCarts();
    res.send(newCart)
});

routeCart.get('/:cid', async(req,res) =>{
    const getCart = await cart.getCartId(req.params.cid);
    res.send(getCart)
})

routeCart.post('/:cid/product/:pid', async (req, res) =>{
    let validProduct = await product.getProductId(parseInt(req.params.pid))

    if (validProduct) {
        const updateCart = await cart.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid))
        res.send(updateCart)
    }
    else {
        res.status(404).send(`Product with id ${req.params.pid} not found`)
    }
})


export default routeCart;