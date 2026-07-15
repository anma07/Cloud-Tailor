const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.payOrder = async (req, res) => {
  const { total } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create payment order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    order_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({
      error: "Invalid signature",
    });
  }

  res.json({
    success: true,
  });
};
