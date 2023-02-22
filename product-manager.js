const fs = require('fs');

class ProductManager {
    #nextId = 0;
    #path
    
    constructor(path){ 
        this.#path = path;
    }

    async addProduct (title, description, price, thumbnail, code, stock ) {

        // const consultProduct = await this.getProducts();

        // consultProduct.find((cod) => cod.code === code)

        // if (consultProduct){
        //     throw new Error(`Evento con ID ${code} ya eXiste`)
        // }
        // if(!title || !description || !price || ! thumbnail || ! code || !stock){
        //     throw new Error(`todos los campos son obligatorios...`)
        // }
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
        const products = await this.getProducts();

        const addProduct = [...products, addProducts]
        
        await fs.promises.writeFile(this.#path, JSON.stringify(addProduct))
        
        
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

        try {
            const productId =  await this.getProducts();
        
            return productId.find((p) => p.id === getprodId)
        } catch (error) {
            throw new Error(`Evento con ID ${getprodId} no encontrado`)
        }
    }
    // NUEVOS METODOS
    async updateProduct(productId, dataToUpdate) {
        // Aca irian checks de que la data tenga sentido, no se incluya el ID, y demas
      
        const products = await this.getProducts();
      
        const updatedProducts = products.map((p) => p.id === productId ? {...p, ...dataToUpdate} : p)
                                             
        // ...resto del codigo de escritura
      }
    
    // async deleteProduct(productId) {
    //     // Elimina el producto
    // }
}


async function main(){
    const manager = new ProductManager("./Products.json");
    console.log( await manager.getProducts())

    await manager.addProduct('producto_1', 'description_1', 1, 'thumbnail', 'code_1', 1)

    await manager.addProduct('producto_2', 'description_2', 2, 'thumbnail', 'code_2', 2)
    await manager.addProduct('producto_3', 'description_3', 3, 'thumbnail', 'code_3', 3)
    await manager.addProduct('producto_4', 'description_4', 4, 'thumbnail', 'code_4', 4)
    await manager.addProduct('producto_5', 'description_5', 5, 'thumbnail', 'code_5', 5)
    await manager.addProduct('producto_6', 'description_6', 6, 'thumbnail', 'code_6', 6)
    await manager.addProduct('producto_7', 'description_7', 7, 'thumbnail', 'code_7', 7)
    await manager.addProduct('producto_8', 'description_8', 8, 'thumbnail', 'code_8', 8)
    await manager.addProduct('producto_9', 'description_9', 9, 'thumbnail', 'code_9', 9)
    await manager.addProduct('producto_10', 'description_10', 10, 'thumbnail', 'code_10', 10)
    
    
    console.log( await manager.getProducts())

    // console.log(await manager.getProductId(10))
}

main()


/**vos podrias ayudarme, la primera, debo validar si existe o no el id'!?!?! tengo duda de eso, despues me di cuenta qe si voy agregando de A UNO LOS PRODUTOS, ME PISA EL ID; pero si agrego toodos juntos, no! los pisa, si los va sumando, bueno, depués, tengo ese problema de validación comenté el codigo  */