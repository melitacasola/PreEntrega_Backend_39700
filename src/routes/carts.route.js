import {Router} from 'express';
import {ProductManager, CartManager} from '../dao/index.js';
import {addProductToCard, removeProductFromCard, cleanToProducts, addArrayToCart, updateQtyToCart} from '../controllers/cart.controller.js'
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
        const {cid} = req.params
        const getCart = await cart.getCartId(cid)
        // res.status(201).send({status: 'ok', payload: getCart})
        res.status(201).send(getCart)
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

//agrega un producto al carrito
cartsRouter.post("/:cid/product/:pid", addProductToCard);

//elimina del carrito el producto seleccionado
cartsRouter.delete('/:cid/products/:pid', removeProductFromCard);

//elimina todos los productos del carrito
cartsRouter.delete('/:cid', cleanToProducts )

//actualiza el carrito con un arreglo de productos
cartsRouter.put('/:cid', addArrayToCart)

//actualiza SÓLO la cantidad de ejemplares del producto
cartsRouter.put('/:cid/products/:pid', updateQtyToCart)

//cambió la ruta conforme al entregable
// cartsRouter.delete("/:cid/product/:pid", removeProductFromCard);

export default cartsRouter;