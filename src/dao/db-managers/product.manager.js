import productModel from "../models/product.model.js";

class ProductManager {
    constructor(){ 
       console.log('Probando desde DB ')
    }
    
    addProduct = async (product) => {
        try {
          const result = await productModel.create(product);
          return result
            
        } catch (error) {
            return (`all camps required`);
        }
    }

   getProducts =  async () =>{
        try {
            const products = await productModel.find().lean()

            return products

        } catch (error) {
            return []
        }  
    }

    getProductId = async(getprodId) => {
        try {
            const productId =  await productModel.findById(getprodId) ;

            if(productId){
                console.log(productId)
                return productId
                
            } else{
                return (` ID ${getprodId} no found`)
            }
        } catch (error) {
            return error;
        }
        
    }

    async updateProduct(id, update){
        try {
            const result = await productModel.findOneAndUpdate({_id: id}, update, {new: true})

            return result
        } catch (error) {
            return {Error: error}
        }
    }
    
    async deleteProduct(productId) {
        try {
            const checkID = await productModel.deleteOne({_id: productId})

             return `Producto ID: ${productId}  borrado con éxito`
            
        } catch (error) {
            return {Error: error}
        }
        
    }
}

export default ProductManager;