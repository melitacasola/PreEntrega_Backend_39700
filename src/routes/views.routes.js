import {json, Router} from 'express';
// import ProductManager from "../dao/file-managers/product.manager.js";
import CartManager from "../dao/file-managers/cart.manager.js"
// import { ProductManager, CartManager } from '../dao/index.js';
import ChatsManager from '../dao/db-managers/chat.manager.js';
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';

// let fileProducts = './src/Products.json'
// let products = new ProductManager()

const viewsRouter = Router();
// const productManager = new ProductManager();
const cartManager = new CartManager()
const chatManager = new ChatsManager()

viewsRouter.use(json())

viewsRouter.get('/real-time-products', async(req, res) =>{
    const prods = await productManager.getProducts()
    res.render('real_time_products', { style: "index"})
})

viewsRouter.get('/carts/:cid', async (req, res) =>{
    const cartId = parseInt(req.params.cid)

    const cart = await cartManager.getProductId(cartId)

    await cartModel.findById(cartId)
    .populate('products')
    .exec((err, cart) => {
      if (err) {
        // Maneja el error de alguna manera
      } else {
        // Aquí ya tienes el carrito y sus productos relacionados.
        // Renderiza la plantilla Handlebars con los datos obtenidos.
      }
    });

    res.render('carts', {cart, style: 'index'})
});

viewsRouter.get("/chat", async (req,res)=>{
    const message = await chatManager.getAll() //como de Real_Time_products esta variable no tiene nada qe ver- inclusive no recibe un arg en real-time-prods
    res.render("chat", {message, style: "index"});
})


viewsRouter.get("/products", async (req, res) => {
  const {page, limit} = req.query
  
    const products = await productModel.paginate(
      {},
      {
        limit: limit ?? 10,
        lean: true,
        page: page ?? 1
      }
    )
  
    res.render("products", {products, style: 'index'});
  })
export default viewsRouter;