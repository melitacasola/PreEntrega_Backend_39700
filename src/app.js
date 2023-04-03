import express, {urlencoded, json} from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import productsRouter from './routes/products.route.js';
import cartsRouter from './routes/carts.route.js';
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import ProductManager from "./dao/file-managers/product.manager.js";
import mongoose from 'mongoose';
import chatRouter from "./routes/chat.route.js";

//los productos
const manager = new ProductManager()
let messages = []
//config
const app = express();
app.use(express.json())
app.use(urlencoded({extended: true}))

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


//ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chats', chatRouter)
app.use('/', viewsRouter)

//arch static
app.use(express.static(__dirname+'/public'))

//mongoose
mongoose.connect("mongodb+srv://melitacasola:mipass123456@cluster0.8cbjso7.mongodb.net/ecommerce?retryWrites=true&w=majority").then((conn) => {
    console.log("Connected To DB!");
  });

const httpServer = app.listen(8080,()=>console.log("Listening on 8080"));
const io = new Server(httpServer);

io.on('connection', async (socket) =>{
    console.log('new client connecting...');

    socket.on('chat-message', (data) =>{
        // let messages = new ChatModel({ user: data.user, message: data.message })
        // messages.save(data);
        messages.push(data)
        io.emit('messages', messages)
    })

    socket.on('new-user', (username) =>{
        
        socket.emit('messages', messages)

        //emitimos msg a todos menos el qe se conecto. 
        socket.broadcast.emit('new-user', username)
    })

    socket.on('message' , (data) =>{
        console.log(data)
    }) //recibe el index.js
    
    const products = await manager.getProducts()
    io.emit('products', products)//mando msj al navegador
})


app.use((req, res, next) =>{
    req.io = io;
    next()
})