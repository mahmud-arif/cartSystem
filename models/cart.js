const mongoose = require('mongoose');

const Scheema = mongoose.Schema;
const cartSchema = new Scheema({
  cart: {
    items: [
      {
        productId: {
          type: Scheema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

cartSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(
    cp => cp.productId._id.toString() === product._id.toString()
  );

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

cartSchema.methods.subtructFromCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(
    cp => cp.productId._id.toString() === product._id.toString()
  );

  let newQuantity;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity - 1;
    if (newQuantity === 0) {
      // console.log(`is is ${this.cart.items[cartProductIndex].productId} `);
      const { productId } = this.cart.items[cartProductIndex];
      const updatedCartItem = this.cart.items.filter(
        item => item.productId.toString() !== productId.toString()
      );
      this.cart.items = updatedCartItem;
      return this.save();
    }

    updatedCartItems[cartProductIndex].quantity = newQuantity;
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

cartSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(
    item => item.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

cartSchema.methods.clearCart = function() {
  this.cart = {
    items: [],
  };
  return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);
