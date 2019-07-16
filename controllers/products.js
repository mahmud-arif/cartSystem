const Product = require('../models/products');

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return res.status(404).json({
      products: 'No products found',
    });
  }
  res.json(products);
};

exports.postAddProduct = async (req, res, next) => {
  const { name } = req.body;
  const { unitPrice } = req.body;
  const { attributes } = req.body;
  const product = new Product({
    name,
    unitPrice,
    attributes,
  });
  const result = await product.save();
  if (!result) {
    return res.status(502).json({
      error: 'error occured while saveing',
    });
  }
  res.json(result);
};
