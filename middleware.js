const authorizeToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const tokenValue = token.split(" ")[1];

  // You should implement logic here to validate the token against your authentication system.
  // For simplicity, let's assume you have a function validateToken(token) that returns true if the token is valid.

  if (!validateToken(tokenValue)) {
    return res.status(401).json({ error: "Invalid token" });
  }

  next(); // Continue processing the request if the token is valid
};
