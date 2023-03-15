import express, {urlencoded, json} from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import routeProducts from './routes/products.route.js';
import routeCart from './routes/carts.route.js';
import routerViews from "./routes/views.routes.js";
import { Server } from "socket.io";

//config
const app = express();
app.use(express.json())
app.use(urlencoded({extended: true}))

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


//ROUTES
app.use('/api/products', routeProducts)
app.use('/api/carts', routeCart)
app.use('/', routerViews)

//arch static
app.use(express.static(__dirname+'/public'))

const httpServer = app.listen(8080,()=>console.log("Listening on 8080"));
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
    console.log('new client connecting...');
    socket.on('message' , (data) =>{
        console.log(data)
    }) //recibe el index.js
    socket.emit("message", "mensaje desde server2 - LLEGAL AL NAVEGADOR EN TIEMPO REAL"); //mando msj a la consola del navegador
})

app.use((req, res, next) =>{
    req.io = io;
    next()
})