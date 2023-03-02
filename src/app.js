import express from 'express';
import routeProducts from './routes/products.route.js';
import routeCart from './routes/carts.route.js';

const app = express();
// const json = './src/Products.json';

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products', routeProducts)
app.use('/api/carts', routeCart)


app.listen(8080,()=>console.log("Listening on 8080"))