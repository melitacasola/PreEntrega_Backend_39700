import cartModel from "../models/cart.model.js";

class CartsManager {

    async getCart() {
        try {
            const carts = await cartModel.find().lean();
            return JSON.stringify(carts, null, '\t')

        } catch (error) {
            console.log(`ERROR getting all carts. Msg: ${error}`)
            return []
        }
    };

    async createNewCart(cart) {
        try {
            const newCart = new cartModel(cart)
            await newCart.save()
            return cart

        } catch (error) {
            return { error: `Cannot create cart. Msg: ${error}` }
        }
    }

    async getCartId(id) {
        try {
            const cart = await cartModel.findById(id).populate('products.product').lean()
            // console.log(await cartModel.findById(id).populate("products.product"))
            return cart
        }
        catch (error) {
            return { error: `Cannot get cart with id ${id}. ${error}` }
        }
    };


    //  add product to cart
    async updateQuantityToProd(cid, pid, quantity) {
        try {
            const cart = await cartModel.findById(cid)
            let objEncontrado = cart.products.find(obj => obj.product.toString() === pid.toString());
            if (objEncontrado) {
                objEncontrado.quantity = quantity
            } else {
                cart.products.push({ product: pid, quantity: quantity })
            }

            const cartUpdate = await cartModel.updateOne({ _id: cid }, cart)
            return cartUpdate

        } catch (error) {
            throw new Error(error);
        }
    };

    async addProduct(cid, pid) {
        try {
            let cart = await cartModel
                .findById(cid)
                .populate('products.product').lean();

            if (cart) {
                const prodToCart = await cartModel.findByIdAndUpdate(
                    { _id: cid, "products.product": pid },

                    { $set: { "products.$.quantity": +1 } }
                );

                console.log(prodToCart)
                
                return prodToCart
            } else {
                const prodToCart = await cartModel.findByIdAndUpdate(
                    { _id: cid, "products.product": pid },
                    { $push: { products: { product: pid, quantity: 1 } } }
                );
                console.log(prodToCart)

                return prodToCart
            }


        } catch (error) {
            throw new Error(error);
        }
    };

    //elimina el carrito entero, deja de existir
    deleteCart = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const result = await cartModel.deleteOne(cart)
            return `Producto ID: ${cart}  borrado con éxito`

        } catch (error) {
            return { Error: error }
        }
    }

    // elimina un producto completo, del carrito, dejando los otros ok
    deleteOneProdToCart = async (cartId, productId) => {
        try {
            const deleteOneProduct = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } })
            console.log(deleteOneProduct)
            return deleteOneProduct
        } catch (error) {
            throw new Error(`ERROR delete product ${productId}. Msg: ${error}`)
        }
    }

    //vaciar carrito sin eliminar el carrito - CLEAN PRODUCTS (borra todos los productos)
    cleanCart = async (cartId) => {
        try {
            const cleanToCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: {} } });
            return cleanToCart;

        } catch (error) {
            throw new Error(`ERROR delete product ${cartId}. Msg: ${error}`)
        }
    };


    //NO AGREGA EL ARRAY
    async addProductsArray(cid, arr) {
        try {
            if (!cid || !arr) {
                return 'missing items'
            }
            const addArray = await cartModel.updateOne({ _id: cid }, { $push: { products: { $each: arr } } })
            console.log(addArray)
            return addArray
        } catch (error) {
            throw new Error(`ERROR update cart ${cid}. Msg: ${error}`)
        }
    }

}

export default CartsManager;