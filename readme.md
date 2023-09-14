# Razorpay Payment Gateway Integration with Express.js

This repository provides an example implementation of integrating the Razorpay payment gateway into an Express.js application. Razorpay is a popular online payment gateway that enables businesses to accept payments through various payment methods. This implementation demonstrates how to create orders, verify payments, handle success and failure events, retrieve payment details, and process refunds using the Razorpay API.

## Getting Started

To use this implementation, follow the steps below:

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. Configure your Razorpay API keys:

   Replace `KEY_ID` and `SECRET_KEY` in the code with your actual Razorpay API key and secret key. These keys can be obtained by creating an account on the [Razorpay Dashboard](https://dashboard.razorpay.com/).

4. Run the application:

   ```bash
   node app.js
   ```

   The server will start listening on the specified port (default is 5000).

## API Endpoints

### Create a new order

**Request:**

```http
POST /createOrder
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "order_receipt",
  "notes": {}
}
```

**Response:**

```json
{
  "id": "order_id",
  "entity": "order",
  "amount": 1000,
  "currency": "INR",
  "receipt": "order_receipt",
  "notes": {},
  // Other order details
}
```

### Verify the payment

**Request:**

```http
POST /verifyOrder
Content-Type: application/json
x-razorpay-signature: generated_signature

{
  "order_id": "order_id",
  "payment_id": "payment_id"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Payment has been verified"
}
```

**Response (Failure):**

```json
{
  "success": false,
  "message": "Payment verification failed"
}
```

### Handle successful payment event

**Request:**

```http
POST /payment/success
Content-Type: application/json

{
  "order_id": "order_id",
  "payment_id": "payment_id"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment succeeded"
}
```

### Handle failed payment event

**Request:**

```http
POST /payment/failure
Content-Type: application/json

{
  "order_id": "order_id",
  "payment_id": "payment_id"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment failed"
}
```

### Retrieve payment details

**Request:**

```http
GET /payment/:payment_id
```

**Response:**

```json
{
  "id": "payment_id",
  "entity": "payment",
  // Payment details
}
```

### Refund a payment

**Request:**

```http
POST /payment/:payment_id/refund
```

**Response:**

```json
{
  "id": "refund_id",
  "entity": "refund",
  // Refund details
}
```

## Conclusion

This repository provides a basic example of integrating the Razorpay payment gateway into an Express.js application. You can use this as a starting point to build more complex payment processing flows or integrate it into your existing projects. Make sure to refer to the [Razorpay API documentation](https://razorpay.com/docs/api/) for more details on available endpoints and customization options.