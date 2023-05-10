import { json, Router } from 'express';
import mongoose from 'mongoose';
import ProductManager from '../dao/db-managers/product.manager.js';
import CartsManager from '../dao/db-managers/cart.manager.js'
import ChatsManager from '../dao/db-managers/chat.manager.js';
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';
import {authMiddleware} from '../middleware/auth.middleware.js'


const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartsManager()
const chatManager = new ChatsManager()

viewsRouter.use(json())

// viewsRouter.get('/real-time-products', async (req, res) => {
//     const prods = await productManager.getProducts()
//     res.render('real_time_products', { style: "index" })
// })

viewsRouter.get("/products", async (req, res) => {
    // const { page, limit } = req.query;
    try {
        const usuario = req.user.email;
        const {limit = 10,page=1,title,stock,sort="asc"} = req.query;
        const stockValue = stock==0 ? undefined : parseInt(stock);
        if(!["asc","desc"].includes(sort)){
            return res.json({status:"error", message:"orden no valido"});
        };
        const sortValue= sort === "asc" ? 1 : -1;
        // console.log('limit: ', limit, "page: ", page,"category: ", category, "stockValue: ", stockValue, "sortValue: ", sortValue);
        let query={};
        if (title && stockValue) {
            query = { title: title, stock: {$gte:stockValue} };
        } else {
            if (title || stockValue) {
                if (title) {
                  query = { title: title };
                } else {
                  query = { stock: {$gte:stockValue} };
                }
            }
        };

        const result = await productModel.paginate(
            query,
            {
                page,
                limit,
                sort: {price: sortValue},
                lean: true,
            }
        )
    
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        const data ={
            email:usuario,
            status:"success",
            payload: result.docs,
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? baseUrl.includes("page") ?
            baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) :baseUrl.concat(`?page=${result.nextPage}`) : null
        };
        res.render("products", data);
    } catch (error) {
        // console.log(error.message);
        res.send(`<div>Hubo un error al cargar esta vista</div>`);
    }
    
});

viewsRouter.get('/products/:pid', async (req, res)=>{
        
        const {pid} = req.params;
        const productId = await productManager.getProductId(pid)
       
        // res.render('prodDetail', { productId, style: 'index'})
        res.render('prodDetail', {productId, style: 'index'})
    

})


viewsRouter.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    // const {page, limit} = req.query

    // const carts = await cartModel.paginate(
    //     {cid},
    //     {
    //         limit: limit ?? 10,
    //         lean: true,
    //         page: page ?? 1
    //     }
    //      );
    const carts = await cartManager.getCartId(cid)
    

    res.render('carts', { carts, style: 'index' })
});


viewsRouter.get("/chat", async (req, res) => {
    const message = await chatManager.getAll() //como de Real_Time_products esta variable no tiene nada qe ver- inclusive no recibe un arg en real-time-prods
    res.render("chat", { message, style: "index" });
})

// routes vistas

viewsRouter.get('/', (req, res) =>{
    const usuario = req.session.user
    res.render('home', {usuario, style: 'index'})
})

//vistas loggin
viewsRouter.get('/login', (req, res) =>{
    res.render('login', { style: 'index'})
})

viewsRouter.get('/signup', (req, res) =>{
    res.render('signup', { style: 'index'})

})


export default viewsRouter;