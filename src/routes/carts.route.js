import {Router} from 'express';
// import {ProductManager, CartManager} from '../dao/index.js';
import CartsManager from '../dao/db-managers/cart.manager.js';

const cartsRouter = Router();
const cart = new CartsManager()

//crear carrito
cartsRouter.post('/', async(req,res) =>{
    try {
        const newCart = await cart.createNewCart([]);
        res.status(201).send({status: 'ok',payload: newCart})
        
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//obtener todos los carritos
cartsRouter.get('/', async(req,res) =>{
    try {
        const allCart = await cart.getCart();
        res.send(allCart)
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//obtener un carrito
cartsRouter.get('/:cid', async(req,res) =>{
    try {
        const {cid} = req.params
        const getCart = await cart.getCartId(cid)
        // res.status(201).send({status: 'ok', payload: getCart})
        res.status(201).send(getCart)
        
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
})

//agrega un producto al carrito
cartsRouter.put("/:cid/products/:pid", async(req, res) =>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const {quantity} = req.body
    try {
            const result = await cart.addProduct(cartId, prodId, quantity);
            res.send(result);
        }
        catch (error) {
            res.status(500).json({
                error: -1,
                description: error.message,
                status: 500
            });
        }
});


//elimina del carrito el producto seleccionado
cartsRouter.delete('/:cid/products/:pid', async(req, res) =>{
    const {cid} = req.params;
    const {pid} = req.params;

    try {
        const result = await cart.deleteOneProdToCart(cid, pid)
        res.send({
            message: 'Product deleted successfully',
            id: pid
        })
        
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//elimina todos los productos del carrito
cartsRouter.delete('/:cid', async(req, res) =>{
    const {cid} = req.params
    try {
        const result = await cart.cleanCart(cid)
        res.send({
            message: 'Cart deleted successfully',
            id: cid
        })
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
} );


//cambió la ruta conforme al entregable
// cartsRouter.delete("/:cid/product/:pid", removeProductFromCard);

export default cartsRouter;