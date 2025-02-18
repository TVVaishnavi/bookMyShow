import { User, IUser } from "../models/user";  
import bcrypt from "bcrypt";
import { generateToken, secretKey } from "../config/jwtToken";
import jwt from "jsonwebtoken";


interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}


const getUsers = async (): Promise<IUser[]> => await User.find({});

const createUser = async ({ name, email, password }: CreateUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();  
  return newUser;  
};

const login = async ({ email, password }: LoginInput): Promise<{ token: string; role?: string }> => {
  try {
    const user:any = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = await generateToken(user);
    return user.role === "admin" ? { role: user.role, token } : { token };
  } catch (error) {
    throw new Error("Login failed");
  }
};

interface DecodedToken {
    id: string;
}

const refreshToken = async (oldToken: string): Promise<string> => {
    try {
      const decoded = jwt.verify(oldToken, secretKey) as DecodedToken;

      const user:any= await User.findById(decoded.id) ;
      if (!user) {
        throw new Error("User not found");
      }

      const newToken = await generateToken(user);
      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Invalid token");
    }
};

export { getUsers, createUser, login, refreshToken };
