import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    messages: {
        type: [
            {
                user: {
                    type: String
                },
                message: {
                    type: String
                },
                timestamp: { type: Date, default: Date.now }
            }
        ],
        default: [],
        
    }
})

const ChatModel = mongoose.model("messages", chatSchema)
export default ChatModel