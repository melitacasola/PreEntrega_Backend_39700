import { json, Router } from 'express';
import mongoose from 'mongoose';
import ProductManager from '../dao/db-managers/product.manager.js'
import ChatsManager from '../dao/db-managers/chat.manager.js';
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';



const viewsRouter = Router();
const productManager = new ProductManager();

const chatManager = new ChatsManager()

viewsRouter.use(json())

// viewsRouter.get('/real-time-products', async (req, res) => {
//     const prods = await productManager.getProducts()
//     res.render('real_time_products', { style: "index" })
// })


viewsRouter.get("/products", async (req, res) => {
    const { page, limit } = req.query

    const products = await productModel.paginate(
        {},
        {
            limit: limit ?? 10,
            lean: true,
            page: page ?? 1
        }
    )

    res.render("products", { products, style: 'index' });
});

viewsRouter.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params;
    const productId = await productManager.getProductId(pid)
   
    // res.render('prodDetail', { productId, style: 'index'})
    res.render('productId', { productId, style: 'index'})

})


viewsRouter.get('/carts/:cid', async (req, res) => {
    const { cid } = req.query;
    const {page, limit} = req.query

    const carts = await cartModel.paginate(
        {cid},
        {
            limit: limit ?? 10,
            lean: true,
            page: page ?? 1
        }
         );

    res.render('carts', { carts, style: 'index' })
});


viewsRouter.get("/chat", async (req, res) => {
    const message = await chatManager.getAll() //como de Real_Time_products esta variable no tiene nada qe ver- inclusive no recibe un arg en real-time-prods
    res.render("chat", { message, style: "index" });
})



export default viewsRouter;