import {Router} from 'express';
import {ProductManager, CartManager} from '../dao/index.js'
import cartModel from '../dao/models/cart.model.js';
// import CartManager from '../dao/file-managers/cart.manager.js';

const cartsRouter = Router();

// let filePathCart = './src/dao/file-managers/files/carts.json'
let cart = new CartManager()
let product = new ProductManager();

cartsRouter.post('/', async(req,res) =>{
    try {
        const newCart = await cart.createNewCart();
        res.status(201).send({status: 'ok',payload: newCart})
        
    } catch (error) {
        res.status(404).send({status: 'error', payload: error})
    }
});

cartsRouter.get('/', async(req,res) =>{
    try {
        const newCart = await cart.getAllCarts();
        res.send(newCart)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
});

cartsRouter.get('/:cid', async(req,res) =>{
    try {
        const getCart = await cart.getCartId(req.params.cid);
        
        res.status(201).send({status: 'ok', payload: getCart})
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) =>{
    try {
        let validProduct = await product.getProductId(parseInt(req.params.pid))
    
        if (validProduct) {
            const updateCart = await cart.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid))
            res.status(201).send({ status: 'ok', payload: updateCart})
        }
        else {
            res.status(404).send(`Product with id ${req.params.pid} not found`)
        }
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

// cartsRouter.post('/:cid/:pid', async (req, res) =>{
//     const {cid , pid} = req.params;

//     const result = await cartModel.

// })

export default cartsRouter;