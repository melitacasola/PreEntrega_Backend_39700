import express, {urlencoded, json} from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import mongoose from 'mongoose';
import session from 'express-session'
import MongoStore from 'connect-mongo'

import __dirname from './utils.js'
import productsRouter from './routes/products.route.js';
import cartsRouter from './routes/carts.route.js';
import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./dao/file-managers/product.manager.js";
import { AuthRouter } from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import ChatsManager from "./dao/db-managers/chat.manager.js";


//constantes
const app = express();
const manager = new ProductManager();
const messages = new ChatsManager();
const dataBase= "mongodb+srv://melitacasola:mipass123456@cluster0.8cbjso7.mongodb.net/ecommerce?retryWrites=true&w=majority"

//config
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  store: MongoStore.create({
    mongoUrl: dataBase,
  }),
  secret:'mysecret',
  resave: true,
  saveUninitialized: true
}))

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


//ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chats', chatRouter)
app.use('/api/sessions', AuthRouter)
app.use(viewsRouter)

//arch static
app.use(express.static(__dirname+'/public'))

//mongoose
mongoose.connect(dataBase).then((conn) => {
    console.log("Connected To DB!");
  });

  app.use(session({
    store: MongoStore.create({
        mongoUrl: dataBase
        
    }),
    secret: 'claveSecreta',
    resave:true,
    saveUninitialized: true
}))


const httpServer = app.listen(8080,()=>console.log("Listening on 8080"));


//WebSocket
const io = new Server(httpServer);

io.on('connection', async (socket) =>{
    console.log('new client connecting...');
    
    socket.on('disconnect', function(){
      console.log('Usuario desconectado');
    });
    
   //chat
   const chats = await messages.getAll()
  
   socket.on('chat-message', function(chats){
     io.emit('chat-message', chats);
   });
   
   socket.on('chat-message', async (chats) =>{
    await messages.addChat(chats)
    console.log(chats)

    const newmsg =await messages.getAll()
     io.sockets.emit('chat-message', newmsg)
   })

   socket.on('new-user', (user) =>{
     socket.emit('messages', chats) //ojo aca capaz va mensaje y no chats  
     //emitimos msg a todos menos el qe se conecto. 
     socket.broadcast.emit('new-user', user)
   })


    const products = await manager.getProducts()
    io.emit('products', products)//mando msj al navegador
})
  

app.use((req, res, next) =>{
    req.io = io;
    next()
});


export {io}