import CartsManager from "../dao/db-managers/cart.manager.js";

const cartManager = new CartsManager()



const addProductToCard = async (req, res) => {
    let ret = null;
    const cid = req.params.cid;
    const pid = req.params.pid;
  
    if (cid && pid) {
      ret = await cartManager.addProduct(cid, pid);
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

export {addProductToCard, removeProductFromCard}



