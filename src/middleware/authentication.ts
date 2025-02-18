import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secretKey } from "../config/jwtToken";
import dotenv from "dotenv";
import { CustomRequest } from "../controller/seat"; // Add this import
import mongoose from "mongoose";

dotenv.config();

interface UserPayload extends JwtPayload {
  id: mongoose.Types.ObjectId; // Change id type to mongoose.Types.ObjectId
  email: string;
  role: string;
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: Missing Token" });
    return;
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err || !user) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    (req as unknown as CustomRequest).user = user as UserPayload; // Cast req to CustomRequest
    next();
  });
};

const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const authMiddleware = { authenticateToken, verifyToken };
export default authMiddleware;
export { UserPayload };
