const path = require('path');

const express = require('express');

const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const promoController = require('../controllers/promo');

router.post('/', catchErrors(promoController.getDiscount));
router.post('/create', catchErrors(promoController.createPromo));

module.exports = router;
