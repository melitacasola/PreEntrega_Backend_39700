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
            console.log(await cartModel.findById(id).populate("products.product"))
            return cart
        }
        catch (error) {
            return { error: `Cannot get cart with id ${id}. ${error}` }
        }
    };


    //  add product to cart
    async addProduct(cid, pid) {
        try {
            let cart = await cartModel.findById(cid)
            
            if (cart) {
                const objEncontrado = cart.products.find(obj => obj._id.toString() === pid);

                if (objEncontrado) {
                    objEncontrado.quantity += 1
                    await cart.save()
                    return cart
                } else {
                    cart.products({product: pid, quantity: 1})
                    await cart.save()
                    return cart
                }
            } else {
                throw new Error('No se encontró el documento o el objeto');
            }

        } catch (error) {
            throw new Error(error);
        }
    };

    async addProduct2(cid, pid) {
        try {
            let cart = await cartModel
                .findById(cid)
                .populate('products.product').lean();
            // console.log(JSON.stringify(cart, null, '\t'))

            // const cart2 = await cartModel.findOne({ products: { $elemMatch: { id: cid } } }).exec();
            // console.log(cart2)

            if (cart) {
                     const prodToCart = await cartModel.updateOne(        
                        { _id: cid,"products.product": pid },
                        
                        { $set: {"products.$.quantity": +1 } }
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
                return productFind
                // return await cart.save()
            // } else {
            //     throw new Error('No se encontró el documento o el objeto');
            // }

        } catch (error) {
            throw new Error(error);
        }
    };

    async addProductToCart3(cartId, productId, quanty) {
        try {
          const findProduct = await cartModel
            .findById(cartId)
            .populate("products.product");
    
          const existingProductIndex = findProduct.products.findIndex(
            (p) => p.product._id.toString() === productId
          );
          let quantyToAdd = quanty ? quanty : 1;
          if (existingProductIndex !== -1) {
            findProduct.products[existingProductIndex].quantity += Number(quantyToAdd);
          } else {
            findProduct.products.push({ product: productId, quantity: quantyToAdd });
          }
    
          return await findProduct.save();
        } catch (err) {
          throw new Error(err);
        }
      }
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

    //NO MODIFICA EL QUANTITY SINO PASO YO DEDE ACA LOS VALORES
    updateQtyProduct = async (cid, pid, newQuantity) => {
        try {
        
        const updateQty = await cartModel.updateOne(        
        { _id: cid,"products.product": pid },
        
        { $set: {"products.$.quantity": newQuantity } }
        );
        console.log(newQuantity, cid, pid + '..manager')
        console.log(updateQty)
        return updateQty;
        
        } catch (error) {
        
        throw new Error(`ERROR update quantity ${cid} ${pid}. Msg: ${error}`)
        
        }
        
        }
}

export default CartsManager;