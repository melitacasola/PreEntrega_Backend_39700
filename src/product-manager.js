import fs from 'fs'; 

class ProductManager {
    #nextId = 0;
    #path
    
    constructor(path){ 
        this.#path = path;
    }

    async addProduct (title, description, price, thumbnail, code, stock ) {
        const consultProduct = await this.getProducts();
        const checkCode = await consultProduct.find((p) => p.code === code)

        if(!title || !description || !price || ! thumbnail || !code || !stock){
            throw new Error(`todos los campos son obligatorios...`)
        } else if (!checkCode){ 
            const addProducts = {
                id: this.#nextId,
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock,
            };
            this.#nextId += 1;
            const addProduct = [...consultProduct, addProducts]
            await fs.promises.writeFile(this.#path, JSON.stringify(addProduct))
        }else{
            throw new Error(`El codigo ${code} ya existe!`);
        }
    }

    async getProducts (){
        try {
            const products = await fs.promises.readFile(this.#path, {encoding: 'utf-8'})
            return JSON.parse(products)

        } catch (error) {
            return []
        }  
    }

    async getProductId(getprodId){
       const products =  await this.getProducts();
       const productId = await products.find((p) => p.id === getprodId)
        if(!productId){
            throw new Error(`Evento con ID ${getprodId} no encontrado`)
        } else{
            return productId
        }
    }
    // NUEVOS METODOS
    async updateProduct(productId, dataToUpdate) {
        // Aca irian checks de que la data tenga sentido, no se incluya el ID, y demas
      
        const products = await this.getProducts();
      
        const updatedProducts = products.map((p) => p.id === productId ? {...p, ...dataToUpdate} : p)
                                             
        // ...resto del codigo de escritura
      }
    
    async deleteProduct(productId) {

        const products = await this.getProducts();
        const checkID = await products.find((p) => p.id === productId)
        
        if(checkID){
            const deleteProd = await products.filter((p) => p.id !== productId)
            await fs.promises.writeFile(this.#path, JSON.stringify(deleteProd))
        } else{
            throw new Error(`el producto ${productId} ya no existe`)
        }
    }
}

// const manager = new ProductManager("./Products.json");

// await manager.addProduct('title', 'description', 1, 'thumbnail', 'code0', 1)
// console.log( await manager.getProducts())
export default ProductManager;