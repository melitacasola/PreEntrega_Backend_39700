import FileProductManager from './file-manager/product.manager.js'
// import DBProductManager from './db-managers/user.manager.js'
import FileCartManager from './file-manager/cart.manager.js'
// import DBCourseManager from './db-managers/course.manager.js'

const config = {
    persistenceType: 'db'
};

let ProductManager, CartManager

if (config.persistenceType === 'db'){
    ProductManager = DBUserManager;
    CourseManager = DBCourseManager;
}else if(config.persistenceType === 'file'){
    ProductManager = FileProductManager;
    CartManager = FileCartManager
}else{
    throw new Error('Unknown persistence type')
};


export {ProductManager, CartManager}