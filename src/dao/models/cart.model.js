import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    } ,
    products:{
        type: Array,
        default: []
    }
});

const cartModel = mongoose.model('carts', cartsSchema);

export default cartModel