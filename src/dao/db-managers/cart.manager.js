import cartModel from '../models/cart.model.js'

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
           const newCart = await cartModel.create(cart)
            return newCart

        } catch (error) {
            
            return { error: `Cannot create cart. Msg: ${error}` }
        }
    }

    // async getCartId(id) {
    //     try {
    //         this.carts = await this.getAllCarts()
    //         let cartsById = this.carts.find(item => item.id == id)
    //         if (!cartsById) {
    //             throw new Error(`ID ${id} not found`)
    //         } else {
    //             return cartsById
    //         }
    //     }
    //     catch (error) {

    //         return { error: `Cannot get cart with id ${id}. ${error}` }

    //     }
    // };
    async addProductToCart(cartId, productId) {
        try {
           

        } catch (error) {
            throw new Error(`ERROR adding product ${productId}. Msg: ${error}`)
        }
    }

}

export default CartsManager;