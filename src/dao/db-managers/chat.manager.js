import chatModel from '../models/chat.model.js'

export default class ChatsManager {
    constructor(){
        console.log("Working with CHAT  using DB")
    }

    getAll = async ( ) =>{
        try {
            const chats = await chatModel.find().lean();
            return chats;
            
        } catch (error) {
            return `"Se produjo un Error: ${error}`
        }
    }

    addChat = async(message) =>{
       try {
        let newChat = await chatModel.create(message);
        return newChat;
       } catch (error) {
        throw new Error(`an unexpected error occurred ${error}`)
       }
    }

    findUsers = async(users) =>{
        try {
            let getUsers = await chatModel.find({user: users});

            return getUsers
        } catch (error) {
            throw new Error(error)
        }
    }

}