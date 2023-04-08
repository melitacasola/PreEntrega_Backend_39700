import { Router, json } from "express";

import {addToChat, getAllMsg} from '../controllers/chat.controller.js'


const chatRouter  = Router ();

// cartsRouter.use(json());


chatRouter.get('/', function(req, res){
try {
    res.render("chat");
    
} catch (error) {
    res.send({ status: "error", error: error.message });
}
  });
  
chatRouter.get("/messages",getAllMsg);

chatRouter.post('/messages', addToChat);

export default chatRouter; 