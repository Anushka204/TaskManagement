import jwt from "jsonwebtoken"

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Missing Authorization header" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" })
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" })
    }

    req.user = decoded
    next()
  })
}
