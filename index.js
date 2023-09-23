const express = require("express");
const crypto = require("crypto");
const razorpayInstance = require("./razorpay.instance");

// const KEY_ID = "rzp_test_rxBGcx4XDbrh0V";
const SECRET_KEY = "H1dnRFeD52W0y0CLZ3GlH4dS";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Razorpay API" });
});

app.use("/createOrder", authorizeToken);
app.use("/verifyOrder", authorizeToken);
app.use("/payment/success", authorizeToken);
app.use("/payment/failure", authorizeToken);
// app.use("/payment/:payment_id/refund", authorizeToken);

// Create a new order
app.post("/createOrder", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const order = await razorpayInstance.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });

    console.log("Order created:", order);

    res.json(order);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
// ... Other code ...

// Verify the payment
app.post("/verifyOrder", (req, res) => {
  const { order_id, payment_id } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];
  const key_secret = SECRET_KEY;

  const payload = `${order_id}|${payment_id}`;

  try {
    const expected_signature = crypto
      .createHmac("sha256", key_secret)
      .update(payload)
      .digest("hex");

    if (razorpay_signature === expected_signature) {
      res.json({ success: true, message: "Payment has been verified" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

// ... Other code ...

// Handle successful payment event
app.post("/payment/success", (req, res) => {
  const { order_id, payment_id } = req.body;

  // Perform actions for successful payment
  // Example: Update database, send confirmation email, etc.

  console.log("Payment successful:", order_id, payment_id);

  res.json({ success: true, message: "Payment succeeded" });
});

// Handle failed payment event
app.post("/payment/failure", (req, res) => {
  const { order_id, payment_id } = req.body;

  // Perform actions for failed payment
  // Example: Update database, send notification, etc.

  res.json({ success: true, message: "Payment failed" });
});

// Retrieve payment details
app.get("/payment/:payment_id", async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await razorpayInstance.payments.fetch(payment_id);

    res.json(payment);
  } catch (error) {
    console.error("Failed to retrieve payment details:", error);
    res.status(500).json({ error: "Failed to retrieve payment details" });
  }
});

// Refund a payment
app.post("/payment/:payment_id/refund", async (req, res) => {
  const { payment_id } = req.params;

  try {
    const refund = await razorpayInstance.payments.refund(payment_id);

    res.json(refund);
  } catch (error) {
    console.error("Failed to process refund:", error);
    res.status(500).json({ error: "Failed to process refund" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on Port", PORT);
});

module.exports = app;
