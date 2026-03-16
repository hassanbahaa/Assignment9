//
import jwt from "jsonwebtoken";
export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Authorization header is required", { cause: 400 }));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) || {};
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new Error("Token expired", { cause: 401 }));
    }
    return next(new Error("User not found", { cause: 404 }));
  }
}
