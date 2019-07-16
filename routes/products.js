const path = require('path');

const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/', catchErrors(productController.getProducts));

router.post('/add-product', catchErrors(productController.postAddProduct));

module.exports = router;
