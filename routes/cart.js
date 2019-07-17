const express = require('express');

const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const cartController = require('../controllers/cart');

router.get('/', catchErrors(cartController.getCart));
router.post('/add-to-cart', catchErrors(cartController.addToCart));
router.post('/sub-from-cart', catchErrors(cartController.subtructFromCart));
router.post(
  '/remove-product',
  catchErrors(cartController.postCartDeleteProduct)
);
router.post('/clearCart', catchErrors(cartController.clearCart));

module.exports = router;
