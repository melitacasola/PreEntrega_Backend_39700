import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnails:{
        type: Array,
        default: []
    },
    code:{
        type: String,
        unique: true,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
});

const productModel = mongoose.model('products', productsSchema);

export default productModel; 