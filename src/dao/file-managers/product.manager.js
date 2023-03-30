import fs from 'fs'; 
import __dirname from '../../utils.js'

const path = __dirname +'/dao/file-managers/files/products.json';

class ProductManager {
    #id = 0;
    constructor(){ 
       console.log('probando')
    }
    
    async addProduct ({ title, description, price, thumbnails, code, stock, category }) {
        try {
            const consultProduct = await this.getProducts();
            const checkCode = await consultProduct.find((p) => p.code === code)
            
            for( let i = 0; i < consultProduct.length; i++){
                if(consultProduct[i].id > this.#id){
                    this.#id = consultProduct[i].id
                }
            }
            this.#id++

            if (!checkCode){ 
                let newProduct = {
                    id: this.#id,
                    title: title, 
                    description: description, 
                    price: price, 
                    thumbnails: thumbnails || [ ],
                    code:code, 
                    stock: stock,
                    category: category,
                    
                };
                consultProduct.push(newProduct)
                await fs.promises.writeFile(path, JSON.stringify(consultProduct))
                return this.getProducts()
            }else{
                return `El codigo ${code} ya existe!`
            }
            
        } catch (error) {
            return (`El codigo ${code} ya existe!`);
        }
    }

    async getProducts (){
        try {
            const products = await fs.promises.readFile(path, {encoding: 'utf-8'})
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

          await fs.promises.writeFile(path, JSON.stringify(products));
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
                await fs.promises.writeFile(path, JSON.stringify(deleteProd))
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