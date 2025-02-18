import crypto from "crypto";
import jwt from "jsonwebtoken";

const secretKey: string = crypto.randomBytes(32).toString("hex");

interface User {
  _id: string;
  email: string;
  role: string;
}

const generateToken = async (user: User): Promise<string> => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
  return token;
};

export { generateToken, secretKey };

