import chatModel from '../models/chat.model.js'

export default class ChatsManager {
    constructor(){
        console.log("Working with msg using DB")
    }

    getAll = async ( ) =>{
        try {
            const chats = await chatModel.find().lean();
            return chats;
            
        } catch (error) {
            return `"Se produjo un Error: ${error}`
        }
    }

    addChat = async(user, message) =>{
        if (!user || !message){
            return 'Error!! All fields are required'
        }else{
            try {
                const newChat = await chatModel.create({
                    user,
                    message
                })
                return "mensaje enviado"
            } catch (error) {
                return `${error}`
            }
        }
    }

}