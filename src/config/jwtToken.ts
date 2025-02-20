import jwt from "jsonwebtoken";
import { secretKey, tokenExpiration } from "../constant";

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

  const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
  return token;
};

export { generateToken, secretKey };
