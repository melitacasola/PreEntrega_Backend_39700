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

            if(!body.title || !body.description || !body.price || !body.thumbnails || !body.code || !body.stock || !body.category){
                throw new Error(`todos los campos son obligatorios...`)
            } 
            if (typeof body.title !== "string" || typeof body.description !== "string" || typeof body.price !== "number" || typeof body.code !== "string" || typeof body.stock !== "number"|| typeof body.category !== "string" ) {
                throw new Error(`Invalid type`)
            }
            if (!checkCode){ 
                let newProduct = {
                    id: this.#id,
                    title: body.title, 
                    description: body.description, 
                    price: body.price, 
                    thumbnails: body.thumbnails || [ ],
                    code: body.code, 
                    stock: body.stock,
                    category: body.category,
                    status: body.status || true,
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
            
            if(productId){
                return productId
            } else{
                return (`Evento con ID ${getprodId} no encontrado`)
            }
        } catch (error) {
            return error;
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
                return `Producto borrado con éxito`
            } else{
                return `el producto ${productId} ya no existe`
            }
            
        } catch (error) {
            return {Error: error}
        }
        
    }
}

export default ProductManager;