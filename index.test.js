const chai = require("chai");
const chaiHttp = require("chai-http");
const crypto = require("crypto");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const app = require("./index"); // Replace with the actual path to your Express app file
const razorpayInstance = require("./razorpay.instance"); // Replace with the actual path to your Razorpay instance file
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(sinonChai);

describe("Razorpay API Tests", () => {
  // Replace with the actual Razorpay API response and errors you want to mock
  const mockRazorpayResponse = {
    id: "mock-order-id",
    // Add other properties as needed
  };

  const mockRazorpayError = new Error("Razorpay error");

  // Mock Razorpay orders.create function
  beforeEach(() => {
    sinon
      .stub(razorpayInstance.orders, "create")
      .resolves(mockRazorpayResponse);
  });

  // Restore Razorpay orders.create function
  afterEach(() => {
    sinon.restore();
  });

  it("should create a new order", async () => {
    const res = await chai.request(app).post("/createOrder").send({
      amount: 1000,
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {},
    });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.id).to.equal(mockRazorpayResponse.id);
  });

  // ... Other code ...

  it("should verify the payment", async () => {
    const order_id = "mock-order-id"; // Use the order ID from the mock response
    const payment_id = "your-payment-id-here";
    const payload = `${order_id}|${payment_id}`;
    const key_secret = "H1dnRFeD52W0y0CLZ3GlH4dS"; // Replace with your actual secret key
    const expected_signature = crypto.createHmac("sha256", key_secret)
      .update(payload)
      .digest("hex");

    const res = await chai
      .request(app)
      .post("/verifyOrder")
      .set("x-razorpay-signature", expected_signature)
      .send({
        order_id,
        payment_id,
      });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.success).to.equal(true);
  });

  // ... Other code ...

  // Add more advanced test cases for other routes as needed

  after(() => {
    // Cleanup or perform any necessary teardown
  });
});
