import productModel from "../models/product.model.js";

// const path = __dirname +'/dao/file-managers/files/products.json';

class ProductManager {
    // #id = 0;
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
            const productId =  await productModel.findOne(getprodId) ;

            if(productId){
                return productId
            } else{
                return (` ID ${getprodId} no found`)
            }
        } catch (error) {
            return error;
        }
        
    }
    // NUEVOS METODOS
    // async updateProduct(id, newProps) {
    //     try {
    //         const products = await this.getProducts();
            
    //         const index = products.findIndex((elem) => elem.id === id);
    //         if (index === -1) {
    //             return "Product to update not found";
    //       }

    //       products[index] = {...products[index], ...newProps};

    //       await fs.promises.writeFile(path, JSON.stringify(products));
    //       return products

    //     } catch (e) {
    //         return { Error: e };
    //     }
    // }
    
    async deleteProduct(productId) {
        try {
            const checkID = await productModel.deleteOne(productId)

             return `Producto ${checkID}  borrado con éxito`
            
        } catch (error) {
            return {Error: error}
        }
        
    }
}

export default ProductManager;