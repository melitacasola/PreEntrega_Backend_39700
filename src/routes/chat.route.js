import { Router, json } from "express";

import ChatsManager from "../dao/db-managers/chat.manager.js";

const chatRouter  = Router ();
const chatManager = new ChatsManager();
// cartsRouter.use(json());

chatRouter.get("/", async (req, res) => {
    try {
        const chats = await chatManager.getAll()
        res.json(chats)
    } catch (error) {
        return `se producto un error: ${error}`
    }
    
});

chatRouter.post('/', async (req, res) =>{
    const { user, message} = req.body;

    try {
        const newChat = await chatManager.addChat(user, message);
        try {
            const chats = await chatManager.getAll();
            req.io.emit('chats', chats)
           
        } catch (error) {
            return `${error} al obtener chat`
        }
        res.send(newChat)
    } catch (error) {
        return `se producto un error: ${error}`
    }
});

export default chatRouter; 