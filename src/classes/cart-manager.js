import fs from 'fs';

class Carts{
    #path;
    id = 0;
    constructor(path){ 
        this.#path = path;
        this.carts = []
    }

    async getAllCarts() {
        try {
            this.carts = await fs.promises.readFile(this.#path, {encoding: 'utf-8'});
            if(this.carts.length == 0){
                this.carts = []
            }else{
                this.carts = JSON.parse(this.carts)
                return this.carts
            }        
        } catch (error) {
            console.log (`ERROR getting all carts. Msg: ${error}`)
            return []
        }
    };

    async createNewCart(){
        try {
            let newCart = {
                id: this.id,
                products: []
            }
            this.carts = await this.getAllCarts();
        
            for( let i = 0; i < this.carts.length; i++){
                if(this.carts[i].id > this.id){
                    this.id = this.carts[i].id
                }
            }
            this.id++
            newCart.id = this.id
            this.carts.push(newCart)

            await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))
            return newCart
            
        } catch (error) {
            console.log (`ERROR creating cart. Msg: ${error}`)
            return {error: `Cannot create cart. Msg: ${error}`}
        }
    }

    async getCartId(id){
        try{
            this.carts = await this.getAllCarts()
            let cartsById = this.carts.find(item => item.id == id)
            if (!cartsById) {
                throw new Error(`ID ${id} not found`)
            } else { 
                return cartsById
            }
        }
        catch (error) {
            console.log (`ERROR getting cart with id ${id}. Msg: ${error}`)
            return {error: `Cannot get cart with id ${id}. ${error}`}
            
        }
    };
    async addProductToCart(cartId, productId) {
        try{
            const carrito = await this.getAllCarts()

            const existingProductIndex = carrito.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar la cantidad en uno
                carrito[existingProductIndex].quantity += 1;
              } else {
                // Si el producto no está en el carrito, agregarlo al carrito con una cantidad de uno
                carrito.push({...productId, quantity: 1});
              }
              await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))
              
        }catch (error) {
            console.log (`ERROR adding product ${productId}. Msg: ${error}`)
        }        
    }

    async updateCart(productId,cartId ){
        try {
            let oldCart = await this.getCartId(cartId)

            oldCart = this.addProductToCart(productId, oldCart)
            let carts = (await this.getAllCarts()).filter(item => item.id != cartId)
            carts.push(oldCart)
            await fs.promises.writeFile(this.#path, JSON.stringify(carts))

            return oldCart
        }
        catch (error) {
            console.log (`ERROR updating cart ${cartId}. Msg: ${error}`)
        }

    }

    
}

export default Carts;