const Product = require('../models/products');
const Cart = require('../models/cart');

let cart;
Cart.find().then(result => {
  if (result) {
    // console.log(result[0].cart.items);
    // cart.cart.items = [...result[0].cart.items];
    cart =
      result[0] ||
      new Cart({
        cart: {
          items: [],
        },
      });
  }
});

exports.getCart = async (req, res, next) => {
  const result = await cart.populate('cart.items.productId').execPopulate();
  if (!result) {
    return res.status(404).json({ error: 'cart not found' });
  }
  res.status(202).json(result);
};
exports.addToCart = async (req, res, next) => {
  // console.log(typeof req.body.productId);
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  const result = await cart.addToCart(product);
  if (!result) {
    return res
      .status(500)
      .json({ error: 'error occurd unable to add to cart' });
  }
  const cartProduct = await cart
    .populate('cart.items.productId')
    .execPopulate();
  if (!cartProduct) {
    return res.status(404).json({ error: 'no product found in cart' });
  }
  res.status(200).json(cartProduct);
};

exports.subtructFromCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  const result = await cart.subtructFromCart(product);
  const cartProduct = await cart
    .populate('cart.items.productId')
    .execPopulate();
  if (!cartProduct) {
    return res.status(404).json({
      error: 'no product found in cart',
    });
  }
  res.status(200).json(cartProduct);
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const result = await cart.removeFromCart(prodId);
  if (!result) {
    return res.status(500).json({ error: 'unable to delet from product' });
  }
  const cartProduct = await cart
    .populate('cart.items.productId')
    .execPopulate();
  if (!cartProduct) {
    return res.status(404).json({
      error: 'no product found in cart',
    });
  }
  res.status(200).json(cartProduct);
};

exports.clearCart = async (req, res, next) => {
  const result = await cart.clearCart();
  res.json(result);
};
