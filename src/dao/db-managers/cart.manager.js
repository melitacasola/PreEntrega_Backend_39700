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
            const cart = await cartModel.findById(id).populate('products.product').lean()
            return cart
        }
        catch (error) {
            return { error: `Cannot get cart with id ${id}. ${error}` }
        }
    };


    //  add product to cart
    async addProduct(cid, pid) {
        try {
            let cat = await cartModel.findById(cid);
            console.log(cat)
            if(!cat){
                let qty
                const updateQty = await cartModel.findByIdAndUpdate(
                    { _id: cid, "products.product": pid },
                    { $push: { products: { product: pid, quantity: qty } } }
                    );
                                // { 'products.$.quantity': newQuantity }
                    console.log(updateQty)
                return updateQty;
            } else{
                const updateQty = await cartModel.updateOne(
                    {"products.product": pid},
                    { $inc: { quantity: +1 }})

                    console.log(updateQty)
                    return updateQty;
            }
            
            // if (cat) {
            //     const objEncontrado = cat.products.find(obj => obj._id.toString() === pid);

            //     if (objEncontrado) {
            //         objEncontrado.quantity += 1
            //         await cat.save()
            //         return cat
            //     } else {
            //         cat.products.push({ _id: pid })
            //         await cat.save()
            //         return cat
            //     }
            // } else {
            //     throw new Error('No se encontró el documento o el objeto');
            // }

        } catch (error) {
            throw new Error(error);
        }
    };

    //elimina el carrito entero, deja de existir
    deleteCart = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const result = await cartModel.deleteOne(cart)
            // console.log(checkID)
            return `Producto ID: ${cart}  borrado con éxito`

        } catch (error) {
            return { Error: error }
        }
    }

    // elimina un producto completo, del carrito, dejando los otros ok
    deleteOneProdToCart = async (cartId, productId) =>{
        try {
           const deleteOneProduct = await cartModel.updateOne({_id: cartId}, {$pull: {products: { _id: productId}}})
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

    //elimina de a 1 la cantidad de producto
    async removeOneProduct(cid, pid) {
        try {
            let cat = await cartModel.findById(cid);
            
            if (cat) {
                const objEncontrado = cat.products.find(obj => obj._id.toString() === pid);
                if (objEncontrado) {
                    objEncontrado.quantity -= 1
                    await cat.save()
                    return cat
                }
            } else {
                throw new Error('No se encontró el documento o el objeto');
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductsArray(cid, arr){
        try {
            if(!cid || !arr){
                return 'missing items'
            }
            const addArray = await cartModel.updateOne({_id: cid}, {$push: {products: { $each: arr}}})
             console.log(addArray)
            return addArray
         } catch (error) {
             throw new Error(`ERROR update cart ${cid}. Msg: ${error}`)
         }
    }

    updateQtyProduct = async(cid, pid) =>{
        try {
            let qty
            const updateQty = await cartModel.findByIdAndUpdate(
                { _id: cid, "products.product": pid },
                { $set: { products: { product: pid, quantity: qty } } }
                );
                            // { 'products.$.quantity': newQuantity }

            return updateQty;
            
        } catch (error) {
            throw new Error(`ERROR update quantity ${cid} ${pid}. Msg: ${error}`)
            
        }
    }
}

export default CartsManager;