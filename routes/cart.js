const express = require('express');

const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const shopController = require('../controllers/cart');

router.get('/cart', catchErrors(shopController.getCart));
router.post('/add-to-cart', catchErrors(shopController.addToCart));
router.post('/sub-from-cart', catchErrors(shopController.subtructFromCart));
router.post(
  '/remove-product',
  catchErrors(shopController.postCartDeleteProduct)
);
router.post('/clearCart', catchErrors(shopController.clearCart));

module.exports = router;
