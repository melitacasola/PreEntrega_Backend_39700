import CartsManager from "../dao/db-managers/cart.manager.js";

const cartManager = new CartsManager()



const addProductToCard = async (req, res) => {
  let ret = null;
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (cid && pid) {
    ret = await cartManager.addProduct2(cid, pid);
    return ret
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};

const removeProductFromCard = async (req, res) => {
  let ret = null;
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (cid && pid) {
    ret = await cartManager.deleteOneProdToCart(cid, pid);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};

//  eliminar todos los productos del carrito
const cleanToProducts = async (req, res) => {
  let ret = null;
  const cid = req.params.cid;

  if (cid) {
    ret = await cartManager.cleanCart(cid);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);

}

const addArrayToCart = async(req,res) =>{
  let ret = null;
  const cid = req.params.cid;
  const arr = req.body;
  if (cid, arr) {
    ret = await cartManager.addProductsArray(cid, arr);
  } else {
    res.status(400).send({ message: "Bad request" });
  }
  res.send(ret);
}

const updateQtyToCart = async(req, res) =>{
  let ret = null;
  const cid = req.params.cid;
  const pid = req.params.pid;
  const qty = parseInt(req.body.qty)
  

  if(cid, pid){
    ret = await cartManager.updateQtyProduct(cid, pid)
    console.log(qty)
  } else {
    res.status(400).send({ message: "Bad request" });
  }
  res.send(ret);
}


export { addProductToCard, removeProductFromCard, cleanToProducts, addArrayToCart, updateQtyToCart }
