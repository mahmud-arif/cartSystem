const DiscountCodes = require('../models/promo');

exports.createPromo = async (req, res, next) => {
  const { code } = req.body;
  const { reductionType } = req.body;
  const { reductionAmount } = req.body;
  const isActive = true;
  const discountCodes = new DiscountCodes({
    code,
    reductionType,
    reductionAmount,
    isActive,
  });
  const result = await discountCodes.save();
  if (!result) {
    return res.status(500).json({ error: 'promo unable to create' });
  }
  res.status(200).json(result);
};

exports.getDiscount = async (req, res, next) => {
  const { code } = req.body;
  // console.log('=============');
  // console.log(code);
  const result = await DiscountCodes.find({
    code,
  });
  if (result.length === 0) {
    // console.log(`res is ${result}`);
    return res.status(404).json({ error: 'this promo code is not exist' });
  }
  res.json(result);
  const discountCodes = result[0];
  console.log(discountCodes);
  discountCodes.isActive = false;
  const updateDoc = await DiscountCodes.findByIdAndUpdate(
    discountCodes._id,
    discountCodes,
    {
      new: true,
    }
  );
  if (!updateDoc) {
    res.status(500).json({ error: 'error in promocode' });
  }
};
