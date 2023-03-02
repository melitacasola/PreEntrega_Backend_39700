import fs from 'fs'; 

class ProductManager {
    #path
    #id = 0;
    constructor(path){ 
        this.#path = path;
    }
    
    async addProduct (body ) {
        try {
            const consultProduct = await this.getProducts();
            const checkCode = await consultProduct.find((p) => p.code === body.code)
            
            for( let i = 0; i < consultProduct.length; i++){
                if(consultProduct[i].id > this.#id){
                    this.#id = consultProduct[i].id
                }
            }
            this.#id++

            if(!body.title || !body.description || !body.price || !body.thumbnail || !body.code || !body.stock){
                throw new Error(`todos los campos son obligatorios...`)
            } 
            if (!checkCode){ 
                let newProduct = {
                    id: this.#id,
                    title: body.title, 
                    description: body.description, 
                    price: body.price, 
                    thumbnail: body.thumbnail, 
                    code: body.code, 
                    stock: body.stock,
                };
                consultProduct.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(consultProduct))
                return this.getProducts()
            }else{
                return `El codigo ${body.code} ya existe!`
            }
            
        } catch (error) {
            return (`El codigo ${body.code} ya existe!`);
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
        try {
            const products =  await this.getProducts();
            const productId = await products.find((p) => p.id === getprodId)
            
            if(!productId){
                throw new Error(`Evento con ID ${getprodId} no encontrado`)
            } else{
                return productId
            }
        } catch (error) {
            return { Error: error };
        }
        
    }
    // NUEVOS METODOS
    async updateProduct(id, newProps) {
        try {
            const products = await this.getProducts();
            
            const index = products.findIndex((elem) => elem.id === id);
            if (index === -1) {
                return "Product to update not found";
          }

          products[index] = {...products[index], ...newProps};

          await fs.promises.writeFile(this.#path, JSON.stringify(products));
          return products

        } catch (e) {
            return { Error: e };
        }
    }
    
    async deleteProduct(productId) {
        try {
            const products = await this.getProducts();
            const checkID = await products.find((p) => p.id === productId)
            if(checkID){
                const deleteProd = await products.filter((p) => p.id !== productId)
                await fs.promises.writeFile(this.#path, JSON.stringify(deleteProd))
            } else{
                console.log(`el producto ${productId} ya no existe`)
            }
            
        } catch (error) {
            return {Error: error}
        }
        
    }
}

// const manager = new ProductManager("./src/Products.json");
// console.log( await manager.getProducts())

// // await manager.addProduct('Product 1', 'description 1', 1, 'thumbnail', 'code1', 1)
// await manager.addProduct('Product 2', 'description 2', 2, 'thumbnail', 'code2', 2)
// await manager.addProduct('Product 3', 'description 3', 3, 'thumbnail', 'code3', 3)
// await manager.addProduct('Product 4', 'description 4', 4, 'thumbnail', 'code4', 4)
// await manager.addProduct('Product 5', 'description 5', 5, 'thumbnail', 'code5', 5)
// await manager.addProduct('Product 6', 'description 6', 6, 'thumbnail', 'code6', 6)
// await manager.addProduct('Product 7', 'description 7', 7, 'thumbnail', 'code7', 7)
// await manager.addProduct('Product 8', 'description 8', 8, 'thumbnail', 'code8', 8)
// await manager.addProduct('Product 9', 'description 9', 9, 'thumbnail', 'code9', 9)
// await manager.addProduct('Product 10', 'description 10', 10, 'thumbnail', 'code10',10)
// console.log( await manager.getProducts())

export default ProductManager;