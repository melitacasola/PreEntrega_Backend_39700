import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    // type: mongoose.Schema.Types.ObjectId
                    type: String
                },
                title: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
    default: []
    }
});

const cartModel = mongoose.model('carts', cartsSchema);

export default cartModel