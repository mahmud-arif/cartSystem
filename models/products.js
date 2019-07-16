const mongoose = require('mongoose');

const Scheema = mongoose.Schema;

const productSchema = new Scheema({
  name: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  attributes: {
    type: String,
    required: true,
  },
  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = mongoose.model('Product', productSchema);
