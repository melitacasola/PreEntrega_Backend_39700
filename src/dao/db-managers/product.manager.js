import productModel from "../models/product.model.js";

class ProductManager {

    addProduct = async (product) => {
        try {
            const result = new productModel(product);
            await result.save()
            return result

        } catch (error) {
            return (`all camps required`);
        }
    }

    getProducts = async () => {
        try{
            const product = await productModel.find();
            return product

        }catch (error) {
            throw error
        }
    }

    getProductId = async (getprodId) => {
        try {
            const productId = await productModel.findById(getprodId);

            if (productId) {
                return productId
            } else {
                return (` ID ${getprodId} no found`)
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, update) {
        try {
            const result = await productModel.findByIdAndUpdate(id, update)
            return result

        } catch (error) {
            return { Error: error }
        }
    }

    async deleteProduct(productId) {
        try {
            const deleteProd = await productModel.findByIdAndDelete(productId)
            return `Producto ID: ${productId}  borrado con éxito`

        } catch (error) {
            return { Error: error }
        }
    }
    async getPaginateProducts(query={},options={}){
        try {
            const result = await productModel.paginate(query,options);
            return result;
        } catch (error) {
            throw new Error(`Error get all ${error}`);
        }
    };
}

export default ProductManager;