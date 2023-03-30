import fs from 'fs';
import ProductManager from './product.manager.js';

const file = './src/Products.json'
const productsManagers = new ProductManager(`${file}`)

class Carts {
    #path;
    id = 0;
    constructor(path) {
        this.#path = path;
        this.carts = []
    }

    async getAllCarts() {
        try {
            this.carts = await fs.promises.readFile(this.#path, { encoding: 'utf-8' });
            if (this.carts.length == 0) {
                this.carts = []
            } else {
                this.carts = JSON.parse(this.carts)
                return this.carts
            }
        } catch (error) {
            console.log(`ERROR getting all carts. Msg: ${error}`)
            return []
        }
    };

    async createNewCart() {
        try {
            let newCart = {
                id: this.id,
                products: []
            }
            this.carts = await this.getAllCarts();

            for (let i = 0; i < this.carts.length; i++) {
                if (this.carts[i].id > this.id) {
                    this.id = this.carts[i].id
                }
            }
            
            this.id++
            newCart.id = this.id
            this.carts.push(newCart)

            await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))
            return newCart

        } catch (error) {
            console.log(`ERROR creating cart. Msg: ${error}`)
            return { error: `Cannot create cart. Msg: ${error}` }
        }
    }

    async getCartId(id) {
        try {
            this.carts = await this.getAllCarts()
            let cartsById = this.carts.find(item => item.id == id)
            if (!cartsById) {
                throw new Error(`ID ${id} not found`)
            } else {
                return cartsById
            }
        }
        catch (error) {

            return { error: `Cannot get cart with id ${id}. ${error}` }

        }
    };
    async addProductToCart(cartId, productId) {
        try {
            const carrito = await this.getCartId(cartId)
            const existProduct = await productsManagers.getProductId(productId)

            if (typeof existProduct == 'string') {
                throw new Error('ingrese producto valido')
            } else {
                const existingProductIndex = carrito.products.filter(prod => prod.product == existProduct.id)

                if (existingProductIndex.length === 0) {
                    carrito.products.push({ product: existProduct.id, quantity: 1 })
                } else {
                    carrito.products = carrito.products.map(key => {
                        if (key.product == existProduct.id) {
                            key.quantity += 1
                        }
                        return key
                    })
                }
                await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))

                return carrito
            }

        } catch (error) {
            throw new Error(`ERROR adding product ${productId}. Msg: ${error}`)
        }
    }

}

export default Carts;