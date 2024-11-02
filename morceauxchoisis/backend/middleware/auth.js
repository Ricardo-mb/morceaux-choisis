import { verifyToken } from "../utils/auth.js";
import { handleError } from "../utils/errorHandler.js";
import { UNAUTHENTICATED } from "../config/constants.js";

export const authenticate = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);
    return decoded.userId;
  } catch (err) {
    handleError("Invalid or expired token", "UNAUTHENTICATED");
  }
};
