const mongoose = require('mongoose');

const DiscountCodesSchema = mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: true,
  },
  reductionType: {
    type: String,
    require: true,
  },
  reductionAmount: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: String,
    require: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    require: true,
    default: true,
  },
});
DiscountCodesSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});
const Discounts = mongoose.model('DiscountCodes', DiscountCodesSchema);
module.exports = Discounts;
