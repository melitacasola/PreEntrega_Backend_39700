import { Router } from "express";
// import {ProductManager} from "../dao/index.js";
// import isAuthenticated from "../middleware/auth.middleware.js";
import ProductManager from "../dao/db-managers/product.manager.js";
import { checkValidProductFields } from "../middleware/vadilate.middleware.js"


const productsRouter = Router();

const productmanager = new ProductManager()

productsRouter.get('/', async (req, res) => {
    try {

        const {limit = 10,page=1,title,stock,sort="asc"} = req.query;
        const stockValue = stock==0 ? undefined : parseInt(stock);
        if(!["asc","desc"].includes(sort)){
            return res.send({status:"error", mesage:"orden no valido"});
        };
        const sortValue= sort === "asc" ? 1 : -1;

        let query = {}

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

        const result = await productmanager.getPaginateProducts(
            query,
            {
                page,
                limit,
                sort:{price:sortValue},
                lean:true,
            }
        );

        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        res.send({
            status:"success",
            payload: result.docs,
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
            nextLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null
        })
    } catch (err) {
    res.status(404).send(`Ops... algo malió sal${err}`)
}
});


productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const response = await productmanager.
            getProductId(pid)

        res.send(response)

    } catch (err) {
        res.status(404).send(`no exiiste${err}`)
    }
})

productsRouter.post('/', checkValidProductFields, async (req, res) => {

    try {
        const body = req.body;
        body.status = Boolean(body.status);
        body.price = Number(body.price);
        body.stock = Number(body.stock);
        console.log("body: ", body);
        const productAdded = await productmanager.addProduct(body);
        res.send({ status: "success", result: productAdded, message: "product added" });
    } catch (error) {
        res.status(404).send(`error ${error}`)
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    // const product = req.body;

    try {
        const productChange = await productmanager.updateProduct(pid, req.body)

        res.status(201).send({ status: 'ok', payload: productChange })

    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deletProduct = await productmanager.deleteProduct(pid)

        res.send(deletProduct)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})

export default productsRouter;