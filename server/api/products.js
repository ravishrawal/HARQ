const router = require('express').Router();
const Product = require('../db/Product');

module.exports = router;

// routes don't currently add new products
// or delete current products in db

// gets all products
router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// gets one product
router.get('/:id', (req, res, next) => {
  return Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

// delete product from cart
router.delete('/', (req, res, next) => {
  return Product.deleteProductFromCart(req.body)
    .catch(next);
});

// update (+1) product in cart
router.put('/', (req, res, next) => {
  return Product.updateProductInCart(req.body)
    .catch(next);
});

// add new product to cart
router.post('/', (req, res, next) => {
  // const orderId = req.body.orderId;
  // const productId = req.body.productId;
  return Product.addProductToCart(req.body)
    .catch(next);
});
