import fs from 'fs';

class Carts{
    #path
    #id = 0;
    constructor(path){ 
        this.#path = path;
        this.carts = []
    }

    async getAllCarts() {
        try {
            this.carts = await fs.promises.readFile(this.#path, {encoding: 'utf-8'});
            return JSON.parse(this.carts)

            // if (this.carts.length == 0) {
            //     this.carts = []
            // }
            // else {
            //     this.carts = JSON.parse(this.carts)
            // }
            // return this.carts

        } catch (error) {
            console.log (`ERROR getting all carts. Msg: ${error}`)
            return []
        }
    };

    async createNewCart(){
        try {
            let newCart = {
                id: this.#id,
                products: []
            }
            this.#id++
            this.carts = await this.getAllCarts();
            this.carts.push(newCart)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))

            return newCart
            
        } catch (error) {
            console.log (`ERROR creating cart. Msg: ${error}`)
            return {error: `Cannot create cart. Msg: ${error}`}
        }
    }

    async getCartId(id){
        try {
            this.carts = await this.getAllCarts();
            let cartByID = this.carts.filter(ids => ids.id === id)
            if(cartByID.length){
                return cartByID[0]
            }else{
                throw new Error(`ID ${id} not Found`)
            }
            
        } catch (error) {
            console.log (`ERROR creating cart. Msg: ${error}`)
            return {error: `Cannot create cart. Msg: ${error}`}
            
        }
    };

    async updateCart(cartId, productId){
        try {
            let oldCart = await this.getCartById(cartId);

            oldCart = this.addProductToCart(productId, oldCart)
            let carts = (await this.getAllCarts()).filter(item => item.id != cartId)
            carts.push(oldCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))

            return oldCart
        }
        catch (error) {
            console.log (`ERROR updating cart ${cartId}. Msg: ${error}`)
        }

    }

    async addProductToCart(productId, cart){
        try {
            let item = cart.products.filter(prod => prod.product == productId)
            if (item.length == 0) {
                cart.products.push({product: productId, quantity: 1})
            }
            else {
                cart.products = cart.products.map(key => {if (key.product == productId) {key.quantity += 1} return key})
            }
            
            return cart
            
        } catch (error) {
            console.log (`ERROR adding product ${productId}. Msg: ${error}`)
            
        }
    }
}

export default Carts;