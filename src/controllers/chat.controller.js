import ChatsManager from "../dao/db-managers/chat.manager.js";
import {io} from '../app.js'

const chatManager = new ChatsManager();

const addToChat = async(req, res) => {
    let chat = null;
    chat = await chatManager.addChat(req.body);

    //websocket
    const messages = await chatManager.getAll();

    io.sockets.emit('messages', messages)
    res.send(chat)
}

const getAllMsg = async (req, res) =>{
    const chat = await chatManager.getAll();

    res.send(chat)
}

const findUser = async (req, res) =>{
    const cid = req.params.cid;
    const chat = await chatManager.findUsers(cid);

    res.send(chat)
}

export {addToChat, getAllMsg, findUser}