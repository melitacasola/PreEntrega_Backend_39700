import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js';
import ProductManager from './product.manager.js';

const products = new ProductManager()

class CartsManager {
    constructor() {
        console.log('working with CART using MongoDB...')
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find().lean();
            return carts
        } catch (error) {
            console.log(`ERROR getting all carts. Msg: ${error}`)
            return []
        }
    };

    async createNewCart(cart) {
        try {
            const cart = {
                products: []
            }
           const newCart = await cartModel.create(cart)
            return newCart

        } catch (error) {
            
            return { error: `Cannot create cart. Msg: ${error}` }
        }
    }

    async getCartId(id) {
        try {
            if(id){
                const cart = await cartModel.find({ _id: `${id}`}).populate('products.product')
                console.log(JSON.stringify(cart, null, '\t'))
                return cart
            } else{
                const productInCart = await cartModel.find().lean()
                return productInCart
            }

        }
        catch (error) {
            return { error: `Cannot get cart with id ${id}. ${error}` }
        }
    };

    async addProductToCart(cartId, productId) {
        try {
           const cart = await cartModel.findById(cartId);
          

           const product = cart.products.find((p) =>p.product === productId.product);

        //    const validProduct = product.
            console.log(product)
           if(product ) {
            product.quantity += 1
            await cart.save()
           } else{
            cart.products.push( {product: productId.product, _id: productId._id })
            await cart.save()
           };

        } catch (error) {
            throw new Error(`ERROR adding product ${productId}. Msg: ${error}`)
        }
    }
    
    deleteCart = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const result = await cartModel.deleteOne(cart)
            // console.log(checkID)
             return `Producto ID: ${cart}  borrado con éxito`
            
        } catch (error) {
            return {Error: error}
        }
    }

}

export default CartsManager;