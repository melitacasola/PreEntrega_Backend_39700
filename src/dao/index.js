import FileProductManager from './file-managers/product.manager.js'
import FileCartManager from './file-managers/cart.manager.js'
import DBProductManager from './db-managers/product.manager.js'
import DBCartManager from './db-managers/cart.manager.js'

const config = {
    persistenceType: 'file'
};

let ProductManager, CartManager

if (config.persistenceType === 'db'){
    ProductManager = DBProductManager;
    CartManager = DBCartManager

}else if(config.persistenceType === 'file'){
    ProductManager = FileProductManager;
    CartManager = FileCartManager
}else{
    throw new Error('Unknown persistence type')
};


export {ProductManager, CartManager}