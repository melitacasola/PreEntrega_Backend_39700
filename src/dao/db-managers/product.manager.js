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

    getProducts = async (queryList) => {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const { sort, title, stock } = req.query;

        try {
            let query = {}

            if (title) {
                query.title = { $regex: new RegExp(title), $options: "i" }
            }
            if (stock) {
                query.stock = { $lte: stock }
            }

            let sortQuery = {};
            if (sort === 'asc') {
                sortQuery.price = 1;
            } else if (sort === 'desc') {
                sortQuery.price = -1;
            }

            return productModel.paginate(query, {
                sort: sortQuery,
                page,
                limit,
                lean: true
            });

        } catch (error) {
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
}

export default ProductManager;