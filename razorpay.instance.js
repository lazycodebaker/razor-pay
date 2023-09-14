const Razorpay = require("razorpay");

const KEY_ID = "rzp_test_rxBGcx4XDbrh0V";
const SECRET_KEY = "H1dnRFeD52W0y0CLZ3GlH4dS";

const razorpayInstance = new Razorpay({
  key_id: KEY_ID,
  key_secret: SECRET_KEY
});

module.exports = razorpayInstance;
