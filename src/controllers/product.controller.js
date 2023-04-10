import productModel from "../dao/models/product.model.js";


function buildQuery(req) {
    // const { page = 1, limit = 10, query, sort } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const { sort, title, stock } = req.query;

    let query = {}

    if(title){
        query.title={ $regex: new RegExp(title), $options: "i" }
    }
    if(stock){
        query.stock= { $lte: stock }
    }

    let sortQuery = {};

  if (sort === 'asc') {
    sortQuery.price = 1;
  } else if (sort === 'desc') {
    sortQuery.price = -1;
  }

    return productModel.paginate(query, {
        sort: sortQuery,
        page ,
        limit,
        lean:true
    });

}

export default buildQuery;